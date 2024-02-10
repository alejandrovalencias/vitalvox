const db = require("../models");
const Paciente = db.pacientes;
const Op = db.Sequelize.Op;

// consultar todos los pacientes
exports.findAll = (req, res) => {
    Paciente.findAll({
        order: [
            ['id', 'DESC'],
        ], attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error consultando todos los pacientes"
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacio!"
        });
        return;
    }
    // crear paciente
    const pacienteRow = req.body;
    // guardar paciente en db
    Paciente.create(pacienteRow)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio error creando paciente."
            });
        });
};

exports.findOne = (req, res) => {
    const { tipoIdentificacion, numeroDocumento } = req.query;

    Paciente.findOne({
        where: { tipoIdentificacion, numeroDocumento }
        , attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `no se encontro paciente con id=${numeroDocumento}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error consultando paciente con id=" + numeroDocumento
        });
    });
};

exports.update = (req, res) => {
    const { tipoIdentificacion, numeroDocumento } = req.params;
    Paciente.update(req.body, {
        where: { tipoIdentificacion, numeroDocumento }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Paciente fue actualizado con exito"
            });
        } else {
            res.send({
                message: `No se pudo actualizar paciente!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error actualizando paciente"
        });
    });
};

exports.delete = (req, res) => {
    const { tipoIdentificacion, numeroDocumento } = req.params;

    console.log(req.params);

    Paciente.destroy({
        where: { tipoIdentificacion, numeroDocumento }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Paciente fue eliminado cone exito"
            });
        } else {
            res.status(500).send({
                message: `No se pudo eliminar paciente!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "No se elimino paciente"
        });
    });
};