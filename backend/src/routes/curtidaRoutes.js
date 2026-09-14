const express = require('express')

const {
  alternarCurtida,
} = require('../controllers/curtidaController')

const router = express.Router()

router.post('/', alternarCurtida)

module.exports = router