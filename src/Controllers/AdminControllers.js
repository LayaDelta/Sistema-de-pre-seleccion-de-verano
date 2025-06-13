const pool = require("../../Config/Conexion");
const Validacion = require("../Controllers/MainControllers");  // Aquí se importa la validación reutilizable

// Mostrar listado de estudiantes con búsqueda y agrupación por materias
const index = (req, res) => {
  const { busqueda } = req.query;

  let sql = "SELECT * FROM estudiantes";
  const params = [];

  if (busqueda) {
    sql += " WHERE id LIKE ? OR nombre LIKE ? OR apellido LIKE ? OR cedula LIKE ? OR correo LIKE ?";
    const likeBusqueda = `%${busqueda}%`;
    params.push(likeBusqueda, likeBusqueda, likeBusqueda, likeBusqueda, likeBusqueda);
  }

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error al obtener estudiantes:", err);
      return res.status(500).send("Error en la base de datos.");
    }

    // Agrupar estudiantes por materias
    const materias = {};

    results.forEach(estudiante => {
      if (estudiante.materia) {
        if (!materias[estudiante.materia]) materias[estudiante.materia] = [];
        materias[estudiante.materia].push(estudiante);
      }
      if (estudiante.materia2) {
        if (!materias[estudiante.materia2]) materias[estudiante.materia2] = [];
        materias[estudiante.materia2].push(estudiante);
      }
    });

    res.render("AdminView.ejs", { estudiantes: results, materias });
  });
};

// Mostrar formulario de edición con datos del estudiante
const editID = (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM estudiantes WHERE id = ?", [id], (error, resultado) => {
    if (error) return res.status(500).send("Error en la base de datos");
    if (resultado.length === 0) return res.status(404).send("Estudiante no encontrado");

    res.render("../view/EditView.ejs", { estudiante: resultado[0], Validacion: false, Mensaje: null });
  });
};

// Actualizar estudiante luego de validación
const SubmitId = (req, res) => {
  const id = req.params.id;

  const form = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Cedula: req.body.Cedula,
    Correo: req.body.Correo,
    Materias1: req.body.Materias1,
    Materias2: req.body.Materias2,
  };

  // Validar datos
  const error = Validacion.validarFormulario(form);
  if (error) {
    // En caso de error, re-renderizar formulario con datos ingresados y mensaje de error
    return res.render("../view/EditView.ejs", {
      estudiante: {
        id,
        nombre: form.Nombre,
        apellido: form.Apellido,
        cedula: form.Cedula,
        correo: form.Correo,
        materia: form.Materias1,
        materia2: form.Materias2
      },
      Validacion: true,
      Mensaje: error
    });
  }

  // Actualizar en la base de datos
  const sql = `UPDATE estudiantes SET nombre = ?, apellido = ?, cedula = ?, correo = ?, materia = ?, materia2 = ? WHERE id = ?`;

  pool.query(
    sql,
    [form.Nombre, form.Apellido, form.Cedula, form.Correo, form.Materias1, form.Materias2, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar estudiante:", err);
        return res.status(500).send("Error en la base de datos al actualizar.");
      }
      res.redirect("/Administrador");
    }
  );
};

// Eliminar estudiante y reordenar IDs para que queden consecutivos
const eliminar = (req, res) => {
  const id = req.params.id;

  pool.query("DELETE FROM estudiantes WHERE id = ?", [id], (error) => {
    if (error) {
      console.error("Error al eliminar:", error);
      return res.status(500).send("Error al eliminar estudiante.");
    }

    // Reordenar IDs: este proceso puede variar según la base de datos
    // En MySQL, esta secuencia de consultas no puede ejecutarse así directamente desde node-mysql
    // Se recomienda hacerlas separadas o reconsiderar si es necesario mantener IDs consecutivos
    const sqlResetIds = `
      SET @count = 0;
      UPDATE estudiantes SET id = (@count := @count + 1);
      ALTER TABLE estudiantes AUTO_INCREMENT = 1;
    `;

    pool.query(sqlResetIds, (error2) => {
      if (error2) {
        console.error("Error al reordenar IDs:", error2);
        return res.status(500).send("Error al reordenar IDs.");
      }
      res.redirect("/Administrador");
    });
  });
};

module.exports = {
  index,
  editID,
  SubmitId,
  eliminar,
};
