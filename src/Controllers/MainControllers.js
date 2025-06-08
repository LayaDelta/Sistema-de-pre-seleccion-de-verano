const index = (req, res) => {
    res.render("MainView")

    }

    const submit = (req, res) => {
        const MainFormulario = {
            Nombre: req.body.Nombre,
             Apellido: req.body.Apellido, 
             Cedula: req.body.Cedula, 
             Materias: req.body.Materias,};

             const DateForm = [...Object.entries(MainFormulario)];

           res.render("../view/Parcials/Ver.ejs", {DateForm})
       
    }

module.exports = {
    index,
    submit,
}