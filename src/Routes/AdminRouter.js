const express = require("express"); 
// Importa Express para crear un router modular

const router = express.Router(); 
// Crea una instancia del router para definir rutas específicas

const controller = require("../Controllers/AdminControllers"); 
// Importa el controlador AdminControllers que maneja la lógica para estas rutas

router.get("/Administrador", controller.index); 
// Ruta GET para "/Administrador", llama a la función index del controlador para mostrar la vista principal del administrador

router.get("/estudiante/:id", controller.editID); 
// Ruta GET para "/estudiante/:id", carga el formulario de edición para un estudiante específico según su ID

router.post("/estudiante/:id", controller.SubmitId); 
// Ruta POST para "/estudiante/:id", envía los datos editados para actualizar el estudiante con el ID correspondiente

router.post("/eliminar/:id", controller.eliminar); 
// Ruta POST para "/eliminar/:id", elimina un estudiante específico según su ID

module.exports = router; 
// Exporta el router para usarlo en el archivo principal de rutas de la aplicación
