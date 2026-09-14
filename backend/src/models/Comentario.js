const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Comentario = sequelize.define('Comentario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  atividadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Comentario