const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Atividade = sequelize.define('Atividade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  tipo: {
    type: DataTypes.ENUM('corrida', 'caminhada', 'trilha'),
    allowNull: false,
  },

  distancia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  duracao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  calorias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Atividade