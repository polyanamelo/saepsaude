const Curtida = require('../models/Curtida')
const alternarCurtida = async (req, res) => {
  try {
    const { usuarioId, atividadeId } = req.body

    if (!usuarioId || !atividadeId) {
      return res.status(400).json({
        mensagem: 'Usuário e atividade são obrigatórios.',
      })
    }

    const curtidaExistente = await Curtida.findOne({
      where: {
        usuarioId,
        atividadeId,
      },
    })

    if (curtidaExistente) {
      await curtidaExistente.destroy()

      return res.status(200).json({
        mensagem: 'Curtida removida com sucesso!',
        curtido: false,
      })
    }

    await Curtida.create({
      usuarioId,
      atividadeId,
    })

    return res.status(201).json({
      mensagem: 'Atividade curtida com sucesso!',
      curtido: true,
    })
  } catch (erro) {
    console.error('Erro ao alternar curtida:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao processar curtida.',
    })
  }
}

module.exports = {
  alternarCurtida,
}