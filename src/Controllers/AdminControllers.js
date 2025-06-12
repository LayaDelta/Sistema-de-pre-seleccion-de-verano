const pool = require("../../Config/Conexion")
const Validacion = require("../Controllers/MainControllers")
 
const index = (req, res) => {
   pool.query("SELECT * FROM estudiantes", (err, results) => {
  if (err);
   return res.render("AdminView.ejs", { estudiantes: results });


    })}

    const editID = (req, res)  => {
 const id = req.params.id;

  pool.query("SELECT * FROM estudiantes WHERE id = ?", [id], (error, resultado) => {
    if (error) {
      return res.status(500).send("Error en la base de datos");
    }

    if (resultado.length === 0) {
      return res.status(404).send("Estudiante no encontrado");
    }

    // Aquí se renderiza la vista, pasando el estudiante encontrado
    res.render("../view/EditView.ejs", { estudiante: resultado[0] });
  });
    }

    const SubmitId = (req, res) => {
       const id = req.params.id;

  const error = Validacion.validarFormulario(form)
  if(error) {
    return editID() 
  }}
  
  
  

    

    module.exports = {
        index,
        editID,
        SubmitId,
    }
