function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')), character => character.charCodeAt(0));
}

async function verifyAccessToken(token, env) {
  const teamDomain = env.CF_ACCESS_TEAM_DOMAIN;
  const audience = env.CF_ACCESS_AUD;
  if (!teamDomain || !audience) return false;

  const [headerPart, payloadPart, signaturePart] = token.split('.');
  if (!headerPart || !payloadPart || !signaturePart) return false;
  const header = JSON.parse(new TextDecoder().decode(decodeBase64Url(headerPart)));
  const claims = JSON.parse(new TextDecoder().decode(decodeBase64Url(payloadPart)));
  if (header.alg !== 'RS256' || claims.iss !== `https://${teamDomain}.cloudflareaccess.com` || !claims.aud?.includes(audience)) return false;
  if (typeof claims.exp !== 'number' || claims.exp <= Date.now() / 1000 || (claims.nbf && claims.nbf > Date.now() / 1000)) return false;
  if (env.ADMIN_EMAIL && claims.email?.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) return false;

  const certificateResponse = await fetch(`https://${teamDomain}.cloudflareaccess.com/cdn-cgi/access/certs`);
  if (!certificateResponse.ok) return false;
  const certificates = await certificateResponse.json();
  const keyData = certificates.keys?.find(key => key.kid === header.kid);
  if (!keyData) return false;
  const publicKey = await crypto.subtle.importKey('jwk', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const signedContent = new TextEncoder().encode(`${headerPart}.${payloadPart}`);
  return crypto.subtle.verify({ name: 'RSASSA-PKCS1-v1_5' }, publicKey, decodeBase64Url(signaturePart), signedContent);
}

export async function onRequest({ request, env, next }) {
  const path = new URL(request.url).pathname;
  if (path !== '/admin' && !path.startsWith('/admin/')) return next();

  const token = request.headers.get('cf-access-jwt-assertion');
  try {
    if (token && await verifyAccessToken(token, env)) return next();
  } catch (error) {
    console.error('No se pudo validar la sesión de Cloudflare Access.', error);
  }
  return new Response('Acceso privado. Inicia sesión con la cuenta autorizada de GitHub.', {
    status: 403,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}