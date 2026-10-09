function cookie(value, attributes) {
  return `${value}; ${attributes.join('; ')}`;
}

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID || !env.ALLOWED_GITHUB_LOGIN) {
    return new Response('El acceso al editor aún no está configurado.', { status: 503 });
  }

  const url = new URL(request.url);
  const stateBytes = crypto.getRandomValues(new Uint8Array(32));
  const state = Array.from(stateBytes, byte => byte.toString(16).padStart(2, '0')).join('');
  const callback = `${url.origin}/api/callback`;
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', callback);
  authorize.searchParams.set('scope', env.GITHUB_OAUTH_SCOPE || url.searchParams.get('scope') || 'public_repo');
  authorize.searchParams.set('state', state);

  const headers = new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  headers.append('set-cookie', cookie(`vinbot_oauth_state=${state}`, ['Path=/api/callback', 'HttpOnly', 'Secure', 'SameSite=Lax', 'Max-Age=600']));
  return new Response(`<!doctype html><meta charset="utf-8"><title>Conectando con GitHub</title><p>Conectando con GitHub…</p><script>const origin=location.origin;window.opener?.postMessage('authorizing:github',origin);window.addEventListener('message',event=>{if(event.origin===origin&&event.data==='authorizing:github')location.replace(${JSON.stringify(authorize.href)})},{once:true})</script>`, { headers });
}