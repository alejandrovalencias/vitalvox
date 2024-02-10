module.exports = app => {
    const pacientes = require("../controllers/paciente.controller.js");
    var router = require("express").Router();

    // Consultar todos
    router.get("/consultarTodos", pacientes.findAll);

    // Crear nuevo paciente
    router.post("/crear", pacientes.create);

    // Consultar paciente
    router.get("/consultar", pacientes.findOne);

    // Actualizar paciente 
    router.put("/update/:tipoIdentificacion/:numeroDocumento", pacientes.update);

    // Eliminar paciente 
    router.delete("/delete/:tipoIdentificacion/:numeroDocumento", pacientes.delete);

    app.use('/api/pacientes', router);
};