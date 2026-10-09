# Vinbot

Landing pública estática para vendedores profesionales de Vinted. Se publica gratis con Cloudflare Pages; Decap CMS permite editar el contenido en `/admin` y guardar los cambios directamente en este repositorio. La aplicación y sus cobros siguen en <https://start.vinbot.app/>.

## Publicar en Cloudflare Pages

1. Sube este repositorio a tu cuenta de GitHub y conserva `main` como rama de producción.
2. En Cloudflare abre **Workers & Pages → Create → Pages → Connect to Git** y selecciona el repositorio.
3. Configura el framework como **None**, deja vacío el comando de compilación y usa `.` como directorio de salida. No hace falta instalar paquetes.
4. Despliega una primera vez con el subdominio `*.pages.dev` de Cloudflare.
5. En **Settings → Variables and Secrets**, agrega las variables OAuth y Access descritas abajo. Vuelve a desplegar después de cambiar las variables.
6. En **Custom domains → Set up a custom domain**, añade `vinbot.app` y sigue las instrucciones DNS de Cloudflare. `www.vinbot.app` es opcional.
7. En `admin/config.yml`, cambia `TU_USUARIO_GITHUB` por el propietario real del repositorio y confirma el nombre del repositorio. Guarda el cambio en GitHub.

La raíz del repositorio es el directorio de salida y Cloudflare detecta automáticamente las funciones de `functions/`. No se necesita Shopify, Stripe, un proceso de build ni un servicio de pago mensual.

## Editor privado `/admin`

Decap CMS guarda sus cambios como commits en `main`; GitHub inicia automáticamente un nuevo despliegue de Pages.

### 1. Crear la OAuth App de GitHub

En GitHub abre **Settings → Developer settings → OAuth Apps → New OAuth App**:

- **Application name:** `Vinbot CMS`
- **Homepage URL:** `https://vinbot.app`
- **Authorization callback URL:** `https://vinbot.app/api/callback`

Guarda la aplicación, copia el **Client ID** y genera un **Client secret**. No guardes el secret en el repositorio. El callback debe coincidir exactamente con el dominio conectado a Pages. Si cambias el dominio, actualiza también esta URL en GitHub.

### 2. Configurar el OAuth del CMS en Pages

En el proyecto de Pages abre **Settings → Variables and Secrets → Add** y define estas variables para **Production**:

| Variable | Valor |
| --- | --- |
| `GITHUB_CLIENT_ID` | Client ID de la OAuth App |
| `GITHUB_CLIENT_SECRET` | Client secret; marcar como secreto |
| `ALLOWED_GITHUB_LOGIN` | Tu nombre de usuario de GitHub |
| `GITHUB_OAUTH_SCOPE` | `public_repo` para un repositorio público o `repo` para uno privado |

El `auth_scope` de `admin/config.yml` debe coincidir: está configurado como `repo`; para un repositorio público cámbialo a `public_repo`. El endpoint verifica el nombre de usuario permitido antes de entregar el token a Decap.

### 3. Proteger la ruta con Cloudflare Access

Este control limita el acceso a la propia pantalla `/admin`, además del login de escritura de Decap.

1. En **Cloudflare Zero Trust → Settings → Authentication → Login methods**, añade GitHub como proveedor de identidad y autoriza tu cuenta. Puedes reutilizar la OAuth App o crear una específica para Access.
2. En **Access → Applications → Add an application → Self-hosted**, crea una aplicación para `vinbot.app` con la ruta `/admin*`.
3. Crea una política **Allow** que use GitHub como proveedor y que permita solo tu correo verificado en el selector **Emails**. No agregues una regla Allow general.
4. Copia el valor **AUD (Application Audience)** de la aplicación. Del dominio de tu equipo Zero Trust, por ejemplo `mi-equipo.cloudflareaccess.com`, copia solo `mi-equipo`.
5. Agrega estas variables de **Production** a Pages:

| Variable | Valor |
| --- | --- |
| `CF_ACCESS_TEAM_DOMAIN` | Nombre del equipo Zero Trust, sin `.cloudflareaccess.com` |
| `CF_ACCESS_AUD` | AUD de la aplicación Access creada para `/admin*` |
| `ADMIN_EMAIL` | El mismo correo autorizado en la política |

Vuelve a desplegar Pages. Comprueba en una ventana privada que `/admin` pide autenticación y que solo tu cuenta puede entrar. Si faltan `CF_ACCESS_TEAM_DOMAIN` o `CF_ACCESS_AUD`, el middleware deja la ruta cerrada.

### 4. Completar el repositorio y entrar

En `admin/config.yml`, reemplaza `TU_USUARIO_GITHUB` en `repo: TU_USUARIO_GITHUB/Vinbot`. Conserva `branch: main`, `base_url: https://vinbot.app` y `auth_endpoint: api/auth` si usas ese dominio.

Cuando DNS, Pages, Access y OAuth estén configurados, abre <https://vinbot.app/admin>. Inicia sesión primero en Cloudflare Access con GitHub y después en Decap con la cuenta GitHub autorizada. En **Contenido de la landing → Página principal** puedes cambiar titulares, textos, botones, enlaces e imágenes. Si no subes imágenes propias, se muestran maquetas con datos ficticios y sin información personal.

## Configuración manual necesaria

En Cloudflare Pages: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_GITHUB_LOGIN`, `GITHUB_OAUTH_SCOPE`, `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD` y `ADMIN_EMAIL`. En `admin/config.yml`: el propietario real del repositorio. En GitHub: la OAuth App con callback `https://vinbot.app/api/callback`. En Zero Trust: proveedor GitHub y política Access limitada a tu correo.

Conecta el dominio `vinbot.app` antes de iniciar OAuth, porque GitHub valida el callback exacto. La dashboard existente no se modifica y los botones de prueba y acceso apuntan a <https://start.vinbot.app/>.