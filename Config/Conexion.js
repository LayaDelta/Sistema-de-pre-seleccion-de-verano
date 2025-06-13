// Importa la librería mysql2 para gestionar la conexión con la base de datos MySQL
const mysql = require('mysql2');

// Crea un pool de conexiones para manejar múltiples consultas simultáneas
const pool = mysql.createPool({
  host: 'localhost',        // Dirección del servidor de la base de datos
  user: 'root',             // Usuario para la conexión
  password: '',             // Contraseña del usuario (vacía en este caso)
  database: 'PreSeleccion', // Nombre de la base de datos a utilizar
  multipleStatements: true, // Permite ejecutar varias sentencias SQL en una sola consulta
});

// Exporta el pool para que pueda ser usado en otros archivos del proyecto
module.exports = pool;
