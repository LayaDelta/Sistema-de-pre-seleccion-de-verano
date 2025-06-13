const express = require("express"); 
// Importa Express para crear el router

const router = express.Router(); 
// Crea una instancia del router de Express

const controller = require("../Controllers/MainControllers"); 
// Importa el controlador principal para manejar las rutas

router.get("/", controller.index); 
// Define la ruta GET "/" que llama al método index del controlador

router.post("/", controller.submit); 
// Define la ruta POST "/" que llama al método submit del controlador

module.exports = router; 
// Exporta el router para que pueda usarse en otras partes de la aplicación
