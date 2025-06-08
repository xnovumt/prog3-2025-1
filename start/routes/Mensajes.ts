import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/mensajes', 'MensajesController.index') // Listar todos los mensajes
    Route.get('/mensajes/:id', 'MensajesController.find') // Buscar un mensaje por ID
    Route.post('/mensajes', 'MensajesController.create') // Crear un mensaje
    Route.put('/mensajes/:id', 'MensajesController.update') // Actualizar un mensaje
    Route.delete('/mensajes/:id', 'MensajesController.delete') // Eliminar un mensaje
})