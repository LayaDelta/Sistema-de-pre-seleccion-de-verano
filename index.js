require("dotenv").config
const express = require("express");
const app = express();
const path = require("path")
const layouts = require("express-ejs-layouts")

//Deteccion de datos del body
app.use(express.urlencoded({extended: false}))

//Layaout Predeterminado.
app.use(layouts)
app.set("layout", "layouts/layout")

//Renderisado de vistas
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src/view"));

//rutas.
//establece la ruta como una constante.
const mainRouter = require("./src/Routes/mainRouter")
//Usa la constante para llamar a la ruta
app.use(mainRouter);

const PreSeleccion = require("./src/Routes/PreSeleccion.router")
app.use(PreSeleccion);


app.use((req, res, next) => {
  res.status(404);
  res.render('err', { error: 'Página no encontrada (404)' });
});

// Middleware para manejo general de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('err', { error: err.message || 'Error interno del servidor' });
});

//Servidor:

//establece el puerto y las variables de entorno
const PORT = process.env.PORT || 3000
//se asegura de que este escuchando por el puerto definido
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))