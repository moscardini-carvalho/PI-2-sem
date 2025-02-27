const { DataTypes } = require('sequelize')
const db = require('../db/connection')

const Tarefa = db.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  data: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  prioridade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'concluida'),
    allowNull: false,
    defaultValue: 'pendente'
  }
})

module.exports = Tarefa
