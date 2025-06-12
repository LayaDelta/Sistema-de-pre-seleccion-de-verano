const pool = require("../../Config/Conexion").promise(); // importante, usa .promise()

const index = (req, res) => {
  res.render("MainView");
};

const validarFormulario = (form) => {
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!soloLetras.test(form.Nombre)) return "Nombre inválido.";
  if (!soloLetras.test(form.Apellido)) return "Apellido inválido.";
  if (form.Cedula.length < 5 || form.Cedula.length > 8) return "La cédula debe tener entre 5 y 8 caracteres.";
  if (!correoValido.test(form.Correo)) return "Correo inválido.";
  if (form.Materias === "Seleccionar") return "Selecciona una materia válida.";

  const camposVacios = Object.entries(form)
    .filter(([key, value]) => key !== "Materias2" && (!value || value === ""))
    .map(([key]) => key);

  if (camposVacios.length > 0) return "Por favor rellena todos los campos.";

  return null;
};

const submit = async (req, res) => {
  const form = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Cedula: req.body.Cedula,
    Correo: req.body.Correo,
    Materias: req.body.Materias1,
    Materias2: req.body.Materias2,
  };

  if (form.Nombre === "Admin" && form.Apellido === "Admin") {
    return res.render("../view/MainView.ejs", { Admin: true });
  }

  const error = validarFormulario(form);
  if (error) {
    return res.render("../view/MainView.ejs", { Validacion: true, Mensaje: error });
  }

  const sql = `INSERT INTO estudiantes (nombre, apellido, cedula, correo, materia, materia2) VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    await pool.query(sql, [
      form.Nombre,
      form.Apellido,
      form.Cedula,
      form.Correo,
      form.Materias,
      form.Materias2,
    ]);

    res.render("../view/MainView.ejs", { Confirmacion: true });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.render("../view/MainView.ejs", { ErrorDup: true });
    }
    console.error("Error al insertar en base de datos:", err);
    res.status(500).send("Error en el servidor.");
  }
};

module.exports = {
  index,
  submit,
  validarFormulario,
};
