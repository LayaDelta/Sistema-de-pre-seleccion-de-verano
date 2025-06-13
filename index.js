// CARGA DE MÓDULOS Y CONSTANTES

// Carga las variables de entorno desde un archivo .env
require("dotenv").config();

// Importa el framework Express
const express = require("express");
// Inicializa la aplicación Express
const app = express();

// Importa el módulo path para trabajar con rutas de archivos
const path = require("path");

// Importa el middleware de layouts para EJS
const layouts = require("express-ejs-layouts");

// IMPORTACIÓN DE RUTAS

// Importa las rutas principales desde mainRouter
const mainRouter = require("./src/Routes/mainRouter");
// Importa las rutas para la vista de administrador
const AdminView = require("./src/Routes/AdminRouter");

// VARIABLES GLOBALES

// Crea una variable global llamada materias disponible en todas las vistas
app.locals.materias = [
  "Matemática I",
  "Fundamentos de la Informática",
  "Lógica Matemática",
  "Lenguaje y Comunicación",
  "Inglés I",
  "Formación Constitucional",
  "Economía Digital en Venezuela",
  "Matemática II",
  "Física I",
  "Algoritmos I",
  "Problemática Científica Tecnológica",
  "Inglés II",
  "Electiva I",
  "Arte y Cultura",
  "Matemática III",
  "Física II",
  "Algoritmos II",
  "Programación I",
  "Metodología y Técnicas de Investigación",
  "Electiva II"
];

// MIDDLEWARES

// Middleware para detectar y procesar datos enviados desde formularios
app.use(express.urlencoded({ extended: false }));

// Usa el middleware de layouts en la aplicación
app.use(layouts);

// CONFIGURACIÓN DE LA APLICACIÓN

// Configura el layout predeterminado que se usará en las vistas
app.set("layout", "layouts/layout");

// Configura el motor de plantillas que se va a utilizar (EJS)
app.set("view engine", "ejs");

// Configura la carpeta donde se encuentran las vistas EJS
app.set("views", path.join(__dirname, "src/view"));

// USO DE RUTAS

// Usa las rutas principales en la aplicación
app.use(mainRouter);

// Usa las rutas del administrador en la aplicación
app.use(AdminView);

// MIDDLEWARES DE ERROR

// Middleware que captura las rutas no existentes (404)
app.use((req, res, next) => {
  // Establece el código de estado 404
  res.status(404);
  // Renderiza una vista de error personalizada para el 404
  res.render('err', { error: 'Página no encontrada (404)' });
});

// Middleware para manejar errores generales de la aplicación
app.use((err, req, res, next) => {
  // Muestra el error en consola
  console.error(err.stack);
  // Establece el código de estado del error, o usa 500 por defecto
  res.status(err.status || 500);
  // Renderiza una vista de error mostrando el mensaje
  res.render('err', { error: err.message || 'Error interno del servidor' });
});

// SERVIDOR

// Define el puerto donde se ejecutará el servidor, leyendo desde variables de entorno o usando 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor en el puerto definido y muestra un mensaje en consola con la URL local
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
