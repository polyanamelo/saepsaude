const express = require('express')

const {
  criarComentario,
  listarComentarios,
} = require('../controllers/comentarioController')

const router = express.Router()

router.post('/', criarComentario)

router.get('/:atividadeId', listarComentarios)

module.exports = router