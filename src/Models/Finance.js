const { DataTypes } = require('sequelize')
const db = require('../db/connection')

const Finance = db.define(
  'finance',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'finance'
  }
)

module.exports = Finance
