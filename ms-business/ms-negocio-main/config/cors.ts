/**
 * Config source: https://git.io/JfefC
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { CorsConfig } from '@ioc:Adonis/Core/Cors'

const corsConfig: CorsConfig = {
  /*
  |--------------------------------------------------------------------------
  | Enabled
  |--------------------------------------------------------------------------
  |
  | A boolean to enable or disable CORS integration from your AdonisJs
  | application.
  |
  | Setting the value to `true` will enable the CORS for all HTTP request. However,
  | you can define a function to enable/disable it on per request basis as well.
  |
  */
  enabled: true, // <--- CAMBIADO: Activa CORS

  // You can also use a function that return true or false.
  // enabled: (request) => request.url().startsWith('/api')

  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Set a list of origins to be allowed for `Access-Control-Allow-Origin`.
  | The value can be one of the following:
  |
  | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
  |
  | Boolean (true)    - Allow current request origin.
  | Boolean (false)   - Disallow all.
  | String            - Comma separated list of allowed origins.
  | Array             - An array of allowed origins. // <--- Usaremos un Array
  | String (*)        - A wildcard (*) to allow all request origins.
  | Function          - Receives the current origin string and should return
  |                     one of the above values.
  |
  */
  origin: ['http://localhost:4200'], // <--- CAMBIADO: Permite explícitamente solo tu frontend en 4200
  // También podrías usar '*' para permitir cualquier origen (útil en desarrollo, menos seguro en prod)
  // origin: '*',


  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  |
  | An array of allowed HTTP methods for CORS. The `Access-Control-Request-Method`
  | is checked against the following list.
  |
  | Following is the list of default methods. Feel free to add more.
  */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'], // Estos métodos suelen ser suficientes para un CRUD

  /*
  |--------------------------------------------------------------------------
  | Headers
  |--------------------------------------------------------------------------
  |
  | List of headers to be allowed for `Access-Control-Allow-Headers` header.
  | The value can be one of the following:
  |
  | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers
  |
  | Boolean(true)     - Allow all headers mentioned in `Access-Control-Request-Headers`. // <--- true es común en desarrollo para no listar manualmente
  | Boolean(false)    - Disallow all headers.
  | String            - Comma separated list of allowed headers.
  | Array             - An array of allowed headers.
  | Function          - Receives the current header and should return one of the above values.
  |
  */
  headers: true, // Permitir todos los headers solicitados por el cliente (común en desarrollo)

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | A list of headers to be exposed by setting `Access-Control-Expose-Headers`.
  | header. By default following 6 simple response headers are exposed.
  |
  | Cache-Control
  | Content-Language
  | Content-Type
  | Expires
  | Last-Modified
  | Pragma
  |
  | In order to add more headers, simply define them inside the following array.
  |
  | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
  |
  */
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ], // Por defecto, suele ser suficiente

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Toggle `Access-Control-Allow-Credentials` header. If value is set to `true`,
  | then header will be set, otherwise not.
  |
  | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
  |
  */
  credentials: true, // <--- Permitir envío de cookies/headers de auth

  /*
  |--------------------------------------------------------------------------
  | MaxAge
  |--------------------------------------------------------------------------
  |
  | Define `Access-Control-Max-Age` header in seconds.
  | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
  |
  */
  maxAge: 90, // Tiempo de caché para las respuestas de pre-vuelo (OPTIONS)
}

export default corsConfig