export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function handleOPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
