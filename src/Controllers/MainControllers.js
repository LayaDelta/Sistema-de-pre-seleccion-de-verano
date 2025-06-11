const pool = require("../../Config/Conexion")

const index = (req, res) => {
    res.render("MainView")

    }

    const submit = (req, res) => {
  const MainFormulario = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Cedula: req.body.Cedula,
    Correo: req.body.Correo,
    Materias: req.body.Materias1,
    Materias2: req.body.Materias2,
    
  };

  const sql = `INSERT INTO estudiantes (nombre, apellido, cedula, correo, materia, materia2) VALUES (?, ?, ?, ?, ?, ?);
      SET @count = 0;
      UPDATE estudiantes SET id = (@count := @count + 1);
      ALTER TABLE estudiantes AUTO_INCREMENT = 1;
    `;




  const Admin = false;
  const Validacion = false;
  const Confirmacion = false;
  const ErrorDup = false

  // Si el usuario no seleccionó nada válido


  const DateForm = [...Object.entries(MainFormulario)];

  const camposVacios = Object.entries(MainFormulario)
  .filter(([key, value]) => key !== "Materias-2" && (!value || value === ""))
  .map(([key]) => key);

   if(req.body.Nombre && req.body.Apellido == "Admin"){
        res.render("../view/MainView.ejs", {Admin: true});
      }

  if (camposVacios.length > 0) {
    return res.render("../view/MainView.ejs", { Validacion: true, Mensaje: "Por favor, rellena todos los campos." }, console.log("error"));
  }


  const SubmitPr = new Promise((resolve, reject) => {
    // Expresión regular para solo letras (mayúsculas, minúsculas y espacios)
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    // Validamos nombre
    if (!soloLetras.test(req.body.Nombre)) {
      return reject( Validacion = true ,new error("El nombre no es válido."));
    }

    // Validamos apellido
    if (!soloLetras.test(req.body.Apellido)) {
      return reject( Validacion = true ,new error("El Apellido no es válido."));
    }
    if (req.body.Cedula.length < 5 || req.body.Cedula.length > 8) {
    return res.render("../view/MainView.ejs", { 
      Validacion: true, 
      Mensaje: "La cédula debe tener entre 5 y 8 caracteres.", 
    });
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(req.body.Correo)) {
    return reject( Validacion = true ,new error("Correo no es válido."));
  }

    if (req.body.Materias1 == "Seleccionar" ) {
      return reject( Validacion = true ,new error("seleccion no es válido."));
    }


    // Si todo está bien
    resolve();
  });

  

  SubmitPr.then(() => {


    // Si pasó las validaciones
    pool.query(
    sql,
    [
      MainFormulario.Nombre,
      MainFormulario.Apellido,
      MainFormulario.Cedula,
      MainFormulario.Correo,
      MainFormulario.Materias,
      MainFormulario.Materias2
    ],
    (err, results) => {
       if (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.render("../view/MainView.ejs", {ErrorDup: true});
    }
    return res.status(500).send("Error en servidor.");}
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
        return res.status(500).send("Error en servidor.");
      }
     res.render("../view/MainView.ejs", {Confirmacion: true});
    }
  )
})
  .catch((err) => {
    // Ya manejamos el error en el reject con res.render, así que no hace falta nada aquí
     res.render("../view/MainView.ejs", { Validacion: true });
  })};


       
    





module.exports = {
    index,
    submit,
}