const express = require('express')

const {
  criarUsuario,
  listarUsuarios,
  fazerLogin,
  buscarPerfil,
} = require('../controllers/usuarioController')

const router = express.Router()

router.post('/', criarUsuario)


router.get('/', listarUsuarios)

router.post('/login', fazerLogin)

router.get('/:id', buscarPerfil)

module.exports = router