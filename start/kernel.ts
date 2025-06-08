import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

Server.middleware.registerNamed({
  security: () => import('App/Middleware/MsSecMid'),
  MsSecMid: () => import('App/Middleware/MsSecMid')
})
