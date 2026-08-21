export const config = { runtime: 'edge' };

const DEFAULT_CLIENT_ID = 'Iv23liuN9t1doOesi9aL';

export default async function handler(req) {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: 'invalid_request', error_description: 'Invalid JSON body.' }, 400); }
  if (!body?.device_code) return json({ error: 'invalid_request', error_description: 'device_code is required.' }, 400);
  const clientId = body?.client_id || process.env.GITHUB_APP_CLIENT_ID || process.env.GITHUB_CLIENT_ID || DEFAULT_CLIENT_ID;
  if (!clientId) return json({ error: 'missing_client_id' }, 500);
  try {
    const upstream = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: clientId, device_code: body.device_code, grant_type: 'urn:ietf:params:oauth:grant-type:device_code' })
    });
    const data = await upstream.json();
    return json(data, upstream.status);
  } catch (error) {
    return json({ error: 'github_request_failed', error_description: error?.message || 'GitHub request failed.' }, 502);
  }
}
function json(data, status=200) { return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }); }
