import { writeFileSync } from 'node:fs';
const { GITHUB_SHA: commit, DEPLOY_ENVIRONMENT: environment } = process.env;
if (!/^[a-f0-9]{40}$/.test(commit ?? '') || !['dev', 'prod'].includes(environment)) {
  throw new Error('Deployment identity requires the exact GitHub commit and environment');
}
writeFileSync('public/deployment.json', JSON.stringify({ commit, environment }) + '\n');
