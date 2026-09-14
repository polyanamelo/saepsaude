const Comentario = require('../models/Comentario')
const Usuario = require('../models/Usuario')
const criarComentario = async (req, res) => {
  try {
    const {
      texto,
      usuarioId,
      atividadeId,
    } = req.body

    if (!usuarioId || !atividadeId) {
      return res.status(400).json({
        mensagem: 'Usuário e atividade são obrigatórios.',
      })
    }

    const textoLimpo = typeof texto === 'string' ? texto.trim() : ''

    if (textoLimpo.length === 0) {
      return res.status(400).json({
        mensagem: 'não é possível enviar um comentário vazio',
      })
    }

    if (textoLimpo.length <= 2) {
      return res.status(400).json({
        mensagem: 'O comentário deve ter mais de 2 caracteres.',
      })
    }

    const comentario = await Comentario.create({
      texto: textoLimpo,
      usuarioId: Number(usuarioId),
      atividadeId: Number(atividadeId),
    })

    return res.status(201).json({
      mensagem: 'Comentário enviado com sucesso!',
      comentario,
    })
  } catch (erro) {
    console.error('Erro ao criar comentário:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao enviar comentário.',
    })
  }
}

const listarComentarios = async (req, res) => {
  try {
    const { atividadeId } = req.params

    if (!atividadeId) {
      return res.status(400).json({
        mensagem: 'A atividade é obrigatória.',
      })
    }

    const comentarios = await Comentario.findAll({
      where: {
        atividadeId: Number(atividadeId),
      },
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nome', 'foto'],
        },
      ],
      order: [['createdAt', 'ASC']],
    })

    return res.status(200).json(comentarios)
  } catch (erro) {
    console.error('Erro ao listar comentários:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao listar comentários.',
    })
  }
}

module.exports = {
  criarComentario,
  listarComentarios,
}