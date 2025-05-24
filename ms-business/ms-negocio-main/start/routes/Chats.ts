import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // filepath: c:\Users\sergi\Desktop\ms-negocio 3\ms-negocio\start\routes.ts
    Route.get('/chats', 'ChatsController.index');// Listar todos los chats
    Route.get("/chats/:id", "ChatsController.find");
    Route.post('/chats', 'ChatsController.create'); // Crear un chat
    Route.put('/chats/:id', 'ChatsController.update'); // Actualizar un chat
    Route.delete('/chats/:id', 'ChatsController.delete'); // Eliminar un chat

});