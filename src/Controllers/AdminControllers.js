const pool = require("../../Config/Conexion");
const Validacion = require("../Controllers/MainControllers");  //Desde aqui se pide validacionFormulario

// Mostrar listado de estudiantes
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

    // Organizar estudiantes por materia
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

// Mostrar formulario de edición
const editID = (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM estudiantes WHERE id = ?", [id], (error, resultado) => {
    if (error) return res.status(500).send("Error en la base de datos");
    if (resultado.length === 0) return res.status(404).send("Estudiante no encontrado");

    res.render("../view/EditView.ejs", { estudiante: resultado[0], Validacion: false, Mensaje: null });
  });
};

//  actualizar estudiante
const SubmitId = (req, res) => {
  const id = req.params.id;

  const form = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Cedula: req.body.Cedula,
    Correo: req.body.Correo,
    Materias: req.body.Materias1,
    Materias2: req.body.Materias2,
  };

  // Validar con la función reutilizable
  const error = Validacion.validarFormulario(form);
  if (error) {
    // Si hay error, mostrara la  vista de edición con los datos actuales del form y el mensaje
    return res.render("../view/EditView.ejs", {
      estudiante: {
        id,
        nombre: form.Nombre,
        apellido: form.Apellido,
        cedula: form.Cedula,
        correo: form.Correo,
        materia: form.Materias,
        materia2: form.Materias2
      },
      Validacion: true,
      Mensaje: error
    });
  }

  //actualizar en base de datos si paso las validaciones
  const sql = `UPDATE estudiantes SET nombre = ?, apellido = ?, cedula = ?, correo = ?, materia = ?, materia2 = ? WHERE id = ?`;

  pool.query(
    sql,
    [form.Nombre, form.Apellido, form.Cedula, form.Correo, form.Materias, form.Materias2, id],
    (err, result) => {
      if (err) return res.status(500).send("Error en la base de datos al actualizar.");

      // renderizar confirmación
      res.redirect("/Administrador");
    }
  );
};

const eliminar = (req, res) => {
  const id = req.params.id;
 pool.query("DELETE FROM estudiantes WHERE id = ?", [id], (error, resultado) => {
    if (error) {
      console.error("Error al eliminar:", error);
      return res.status(500).send("Error al eliminar estudiante.");
    }

    // Actualizar IDs para que queden consecutivos
    const sqlResetIds = `
      SET @count = 0;
      UPDATE estudiantes SET id = (@count := @count + 1);
      ALTER TABLE estudiantes AUTO_INCREMENT = 1;
    `;

    pool.query(sqlResetIds, (error) => {
      if (error) {
        console.error("Error al reordenar IDs:", error);
        return res.status(500).send("Error al reordenar IDs.");
      }
      res.redirect("/Administrador");  // redirige de nuevo al listado
});
  });
}




module.exports = {
  index,
  editID,
  SubmitId,
  eliminar,
};
