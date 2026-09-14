const { Op } = require('sequelize')

const Atividade = require('../models/Atividade')
const Usuario = require('../models/Usuario')
const Curtida = require('../models/Curtida')
const Comentario = require('../models/Comentario')
const criarAtividade = async (req, res) => {
  try {
    const {
      tipo,
      distancia,
      duracao,
      calorias,
      usuarioId,
    } = req.body

    if (
      !tipo ||
      distancia === undefined ||
      duracao === undefined ||
      calorias === undefined ||
      !usuarioId
    ) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios.',
      })
    }

    const tiposPermitidos = ['corrida', 'caminhada', 'trilha']

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: 'O tipo deve ser corrida, caminhada ou trilha.',
      })
    }

    if (
      !Number.isFinite(Number(distancia)) ||
      !Number.isFinite(Number(duracao)) ||
      !Number.isFinite(Number(calorias))
    ) {
      return res.status(400).json({
        mensagem: 'Distância, duração e calorias devem ser numéricos.',
      })
    }

    const atividade = await Atividade.create({
      tipo,
      distancia: Number(distancia),
      duracao: Number(duracao),
      calorias: Number(calorias),
      usuarioId: Number(usuarioId),
    })

    return res.status(201).json({
      mensagem: 'Atividade cadastrada com sucesso!',
      atividade,
    })
  } catch (erro) {
    console.error('Erro ao cadastrar atividade:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar atividade.',
    })
  }
}

const listarAtividades = async (req, res) => {
  try {
    const {
      tipo,
      pagina = 1,
      limite = 4,
      usuarioId,
    } = req.query

    const tiposPermitidos = ['corrida', 'caminhada', 'trilha']

    const where = {}

    if (tipo) {
      if (!tiposPermitidos.includes(tipo)) {
        return res.status(400).json({
          mensagem: 'O tipo deve ser corrida, caminhada ou trilha.',
        })
      }

      where.tipo = tipo
    }

    const paginaAtual = Math.max(Number(pagina) || 1, 1)
    const limiteAtual = Math.max(Number(limite) || 4, 1)
    const offset = (paginaAtual - 1) * limiteAtual

    const { count, rows: atividades } = await Atividade.findAndCountAll({
      where,

      include: [
        {
          model: Usuario,
          attributes: ['id', 'nome', 'foto'],
        },
        {
          model: Curtida,
          attributes: ['id', 'usuarioId'],
        },
        {
          model: Comentario,
          attributes: ['id', 'texto', 'usuarioId'],
        },
      ],

      order: [['createdAt', 'DESC']],

      limit: limiteAtual,
      offset,
      distinct: true,
    })

    const atividadesFormatadas = atividades.map((atividade) => {
      const curtidoPeloUsuario = usuarioId
        ? atividade.Curtidas.some(
            (curtida) =>
              Number(curtida.usuarioId) === Number(usuarioId)
          )
        : false

      return {
        id: atividade.id,
        tipo: atividade.tipo,
        distancia: atividade.distancia,
        duracao: atividade.duracao,
        calorias: atividade.calorias,
        usuarioId: atividade.usuarioId,
        createdAt: atividade.createdAt,

        usuario: atividade.Usuario,

        curtidas: atividade.Curtidas.length,

        comentarios: atividade.Comentarios.length,

        curtidoPeloUsuario,
      }
    })

    const totalPaginas = Math.ceil(count / limiteAtual)

    return res.status(200).json({
      atividades: atividadesFormatadas,

      paginacao: {
        paginaAtual,
        limite: limiteAtual,
        totalAtividades: count,
        totalPaginas,
      },
    })
  } catch (erro) {
    console.error('Erro ao listar atividades:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao listar atividades.',
    })
  }
}

module.exports = {
  criarAtividade,
  listarAtividades,
}