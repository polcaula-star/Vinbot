function responsePage(message, status = 200, clearCookie = false) {
  const headers = new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'content-security-policy': "default-src 'none'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'" });
  if (clearCookie) headers.append('set-cookie', 'vinbot_oauth_state=; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  return new Response(`<!doctype html><meta charset="utf-8"><title>Vinbot · GitHub</title><p>${status === 200 ? 'Conexión completada. Ya puedes cerrar esta ventana.' : 'No se pudo completar el acceso. Cierra esta ventana e inténtalo de nuevo.'}</p><script>window.opener?.postMessage(${JSON.stringify(message)},location.origin)</script>`, { status, headers });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const stateCookie = request.headers.get('cookie')?.match(/(?:^|;\s*)vinbot_oauth_state=([^;]+)/)?.[1];
  const storedState = stateCookie && decodeURIComponent(stateCookie);
  const returnedState = params.get('state');
  if (!storedState || !returnedState || storedState !== returnedState) {
    return responsePage('authorization:github:error:' + JSON.stringify({ message: 'La comprobación de seguridad ha fallado. Vuelve a intentarlo.' }), 400, true);
  }
  if (params.has('error') || !params.get('code')) {
    return responsePage('authorization:github:error:' + JSON.stringify({ message: 'GitHub no autorizó el acceso.' }), 400, true);
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code: params.get('code'), redirect_uri: `${url.origin}/api/callback` }),
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) throw new Error('GitHub no devolvió un token válido.');

    const userResponse = await fetch('https://api.github.com/user', {
      headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${tokenData.access_token}`, 'user-agent': 'Vinbot-Landing-CMS' },
    });
    const githubUser = await userResponse.json();
    if (!userResponse.ok || githubUser.login?.toLowerCase() !== env.ALLOWED_GITHUB_LOGIN.toLowerCase()) {
      return responsePage('authorization:github:error:' + JSON.stringify({ message: 'Esta cuenta de GitHub no tiene acceso al editor.' }), 403, true);
    }

    return responsePage('authorization:github:success:' + JSON.stringify({ token: tokenData.access_token, provider: 'github' }), 200, true);
  } catch (error) {
    console.error('Falló el callback de GitHub OAuth.', error);
    return responsePage('authorization:github:error:' + JSON.stringify({ message: 'No se pudo validar la cuenta de GitHub.' }), 500, true);
  }
}