const pool = require("../Config/Conexion").promise();

const contarMaterias = async (materias) => {
  const [result] = await pool.query(`SELECT materia, materia2 FROM estudiantes`);
  const conteo = {};
  materias.forEach(m => conteo[m] = 0);

  result.forEach(row => {
    if (row.materia && conteo.hasOwnProperty(row.materia)) conteo[row.materia]++;
    if (row.materia2 && conteo.hasOwnProperty(row.materia2)) conteo[row.materia2]++;
  });

  return conteo;
};

const index = async (req, res) => {
  const materias = req.app.locals.materias;
  const conteoMaterias = await contarMaterias(materias);

  res.render("MainView", {
    formData: {},
    conteoMaterias
  });
};

const submit = async (req, res) => {
  const materias = req.app.locals.materias;

  const form = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Cedula: req.body.Cedula,
    Correo: req.body.Correo,
    Materias1: req.body.Materias1,
    Materias2: req.body.Materias2
  };

  const error = validarFormulario(form, materias);
  const conteoMaterias = await contarMaterias(materias);

  if (error) {
    return res.render("MainView", {
      Validacion: true,
      Mensaje: error,
      formData: form,
      conteoMaterias
    });
  }

  const sql = `INSERT INTO estudiantes (nombre, apellido, cedula, correo, materia, materia2) VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    await pool.query(sql, [
      form.Nombre,
      form.Apellido,
      form.Cedula,
      form.Correo,
      form.Materias1,
      form.Materias2
    ]);

    const nuevoConteo = await contarMaterias(materias);

    res.render("MainView", {
      Confirmacion: true,
      formData: {},
      conteoMaterias: nuevoConteo
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.render("MainView", {
        ErrorDup: true,
        formData: form,
        conteoMaterias
      });
    }
    console.error("Error en BD:", err);
    res.status(500).send("Error en el servidor.");
  }
};

const validarFormulario = (form, materias) => {
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!soloLetras.test(form.Nombre)) return "Nombre inválido.";
  if (!soloLetras.test(form.Apellido)) return "Apellido inválido.";
  if (form.Cedula.length < 5 || form.Cedula.length > 8) return "La cédula debe tener entre 5 y 8 caracteres.";
  if (!correoValido.test(form.Correo)) return "Correo inválido.";
  if (form.Materias1 === "Seleccionar") return "Selecciona una materia válida.";
  if (form.Materias1 === form.Materias2 && form.Materias1 !== "Seleccionar")
    return "No puedes tener dos materias iguales.";

  return null;
};
module.exports = {
  index,
  submit,
  validarFormulario,
};
