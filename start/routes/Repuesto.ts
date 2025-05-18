import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/repuesto", "RepuestoController.find");
    Route.get("/repuesto/:id", "RepuestoController.find");
    Route.post("/repuesto", "RepuestoController.create");
    Route.put("/repuesto/:id", "RepuestoController.update");
    Route.delete("/repuesto/:id", "RepuestoController.delete");
});