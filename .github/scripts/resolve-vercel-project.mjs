import { appendFileSync } from 'node:fs';
const { VERCEL_TOKEN: token, VERCEL_PROJECT_ID: projectId, VERCEL_ORG_ID: configuredOwner, GITHUB_OUTPUT: output } = process.env;
if (!token || !projectId || !output) throw new Error('Missing Vercel token, project ID, or GitHub output path');
const headers = { Authorization: `Bearer ${token.trim()}` };
async function getProject(owner) {
  const url = new URL(`https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}`);
  if (owner) url.searchParams.set('teamId', owner);
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
  if (response.status === 401) throw new Error('VERCEL_TOKEN was rejected. Replace the prod environment secret with a valid Vercel token.');
  if (!response.ok) return null;
  const project = await response.json();
  return project.id === projectId ? project : null;
}
let project = await getProject(configuredOwner);
if (!project) project = await getProject();
if (!project) {
  const response = await fetch('https://api.vercel.com/v2/teams?limit=100', { headers, signal: AbortSignal.timeout(20000) });
  if (response.ok) {
    for (const team of (await response.json()).teams ?? []) {
      project = await getProject(team.id);
      if (project) break;
    }
  }
}
if (!project?.accountId) throw new Error('The configured VERCEL_PROJECT_ID is not accessible to VERCEL_TOKEN. Verify the linked project ID and token scope.');
appendFileSync(output, `org_id=${project.accountId}\nproject_id=${project.id}\n`);
console.log(`Verified Vercel project ${project.id}; owner ID: ${project.accountId}`);
if (configuredOwner !== project.accountId) console.log('Configured VERCEL_ORG_ID differs from the project owner; using the verified owner for this deployment.');
