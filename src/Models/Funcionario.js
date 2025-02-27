const { DataTypes } = require('sequelize')

const db = require('../db/connection')

const Funcionario = db.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  salario: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
})

module.exports = Funcionario
