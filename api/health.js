export const config = { runtime: 'edge' };
export default async function handler(req) {
  if (req.method !== 'GET') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  const configured = Boolean(process.env.GITHUB_APP_CLIENT_ID || process.env.GITHUB_CLIENT_ID || 'Iv23liuN9t1doOesi9aL');
  return new Response(JSON.stringify({ ok: true, app: 'RepoDrive', version: '0.1.5', auth: 'github-device-flow', clientIdConfigured: configured }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
