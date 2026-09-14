const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Curtida = sequelize.define('Curtida', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  atividadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['usuarioId', 'atividadeId'],
    },
  ],
})

module.exports = Curtida