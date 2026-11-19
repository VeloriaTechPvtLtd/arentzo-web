export function getSafeReturnPath(returnTo?: string | null): string {
  if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) return '/';
  if (returnTo.includes('\\')) return '/';
  return returnTo;
}
