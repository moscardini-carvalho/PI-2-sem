const { DataTypes } = require('sequelize')
const db = require('../db/connection')

const Funcionario = require('./Funcionario')

const Feedback = db.define('Feedback', {
  tipo_feedback: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
})

Feedback.belongsTo(Funcionario, {
  foreignKey: 'FuncionarioId',
  onDelete: 'CASCADE'
})

Funcionario.hasMany(Feedback, {
  foreignKey: 'FuncionarioId',
  onDelete: 'CASCADE'
})

module.exports = Feedback
