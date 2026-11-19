import { readFileSync } from 'node:fs';

function required(name) {
  const value = process.env[name];
  if (!value?.trim()) throw new Error(`Missing deployment variable: ${name}`);
  return value;
}

function httpsOrigin(name) {
  const value = required(name);
  let url;
  try { url = new URL(value); } catch { throw new Error(`${name} must be a valid HTTPS origin`); }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error(`${name} must be an HTTPS origin without a path or credentials`);
  }
  return url.origin;
}

const environment = required('DEPLOY_ENVIRONMENT');
if (!['dev', 'prod'].includes(environment)) throw new Error('Unknown deployment environment');
const supabaseUrl = httpsOrigin('SUPABASE_URL');
const siteUrl = httpsOrigin('SITE_URL');
const key = required('SUPABASE_ANON_KEY');
let publicKey = key.startsWith('sb_publishable_');
if (!publicKey && key.split('.').length === 3) {
  try {
    publicKey = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString()).role === 'anon';
  } catch { /* Rejected below. */ }
}
if (!publicKey) throw new Error('SUPABASE_ANON_KEY must be a publishable key or legacy anon JWT');

const developmentSupabase = 'https://astiltnwyoxtcisedcyx.supabase.co';
if (environment === 'dev') {
  if (supabaseUrl !== developmentSupabase) throw new Error('Development must use the Rental Dev Supabase project');
  if (siteUrl === 'https://arentzo.com') throw new Error('Development SITE_URL cannot be the production origin');
  if (required('FIREBASE_PROJECT_ID') !== 'rental-2c497') throw new Error('Development must deploy to Firebase project rental-2c497');
  const config = JSON.parse(readFileSync('firebase.json', 'utf8'));
  if (config.hosting?.site !== process.env.FIREBASE_PROJECT_ID || config.hosting?.public !== 'out') {
    throw new Error('Development must publish out/ to the default rental-2c497 Hosting site');
  }
} else {
  if (supabaseUrl === developmentSupabase) throw new Error('Production cannot use the Rental Dev Supabase project');
  required('VERCEL_ORG_ID');
  required('VERCEL_PROJECT_ID');
}
console.log(`Validated ${environment} deployment configuration.`);
