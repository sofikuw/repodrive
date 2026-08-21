export const config = { runtime: 'edge' };
export default function handler() {
  return new Response(null, { status: 307, headers: { Location: '/', 'Cache-Control': 'no-store' } });
}
