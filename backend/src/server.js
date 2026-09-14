const express = require('express')
const cors = require('cors')
const sequelize = require('./config/db')
const Usuario = require('./models/Usuario')
const Atividade = require('./models/Atividade')
const Curtida = require('./models/Curtida')
const Comentario = require('./models/Comentario')
const usuarioRoutes = require('./routes/usuarioRoutes')
const atividadeRoutes = require('./routes/atividadeRoutes')
const curtidaRoutes = require('./routes/curtidaRoutes')
const comentarioRoutes = require('./routes/comentarioRoutes')

Usuario.hasMany(Atividade, {
  foreignKey: 'usuarioId',
})

Atividade.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
})

Usuario.hasMany(Curtida, {
  foreignKey: 'usuarioId',
})

Curtida.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
})

Atividade.hasMany(Curtida, {
  foreignKey: 'atividadeId',
})

Curtida.belongsTo(Atividade, {
  foreignKey: 'atividadeId',
})

Usuario.hasMany(Comentario, {
  foreignKey: 'usuarioId',
})

Comentario.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
})

Atividade.hasMany(Comentario, {
  foreignKey: 'atividadeId',
})

Comentario.belongsTo(Atividade, {
  foreignKey: 'atividadeId',
})

const app = express()

const PORT = 3000


app.use(cors())


app.use(express.json())


app.use('/usuarios', usuarioRoutes)


app.use('/atividades', atividadeRoutes)


app.use('/curtidas', curtidaRoutes)

app.use('/comentarios', comentarioRoutes)

app.get('/', (req, res) => {
  res.json({
    mensagem: 'Backend do SAEPSaúde funcionando!',
  })
})

sequelize.authenticate()
  .then(() => {
    console.log('MySQL conectado com sucesso!')

    return sequelize.sync()
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!')

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
  })
  .catch((erro) => {
    console.error('Erro:', erro.message)
  })