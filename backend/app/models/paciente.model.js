module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define("paciente", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(50)
            , allowNull: false
        },
        tipoIdentificacion: {
            type: Sequelize.STRING(10)
            , allowNull: false
        },
        numeroDocumento: {
            type: Sequelize.INTEGER
            , allowNull: false
        },
        fechaNacimiento: {
            type: Sequelize.DATE
            , allowNull: false
        },
        peso: {
            type: Sequelize.STRING(10)
            , allowNull: false
        },
        talla: {
            type: Sequelize.STRING(10)
            , allowNull: false
        },
    });

    return Paciente;
};