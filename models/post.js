const banco = require("./banco")

const Cliente = banco.sequelize.define('clientes', {
    nome: {
        type: banco.Sequelize.STRING
    },
    endereco: {
        type: banco.Sequelize.STRING
    },
    bairro: {
        type: banco.Sequelize.STRING
    },
    cep: {
        type: banco.Sequelize.STRING
    },
    cidade: {
        type: banco.Sequelize.STRING
    },
    estado: {
        type: banco.Sequelize.STRING
    },
    telefone: {
        type: banco.Sequelize.STRING
    }
})

//Cliente.sync({force: true})

module.exports = Cliente