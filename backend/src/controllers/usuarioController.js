const bcrypt = require('bcrypt')

const Usuario = require('../models/Usuario')
const Atividade = require('../models/Atividade')

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, foto } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Nome, email e senha são obrigatórios.',
      })
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email },
    })

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: 'Este email já está cadastrado.',
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      foto: foto || null,
    })

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        foto: usuario.foto,
      },
    })
  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário.',
    })
  }
}

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: {
        exclude: ['senha'],
      },
    })

    return res.status(200).json(usuarios)
  } catch (erro) {
    console.error('Erro ao listar usuários:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao listar usuários.',
    })
  }
}

const fazerLogin = async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'Email e senha são obrigatórios.',
      })
    }

    const usuario = await Usuario.findOne({
      where: { email },
    })

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'Email ou senha inválidos.',
      })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: 'Email ou senha inválidos.',
      })
    }

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        foto: usuario.foto,
      },
    })
  } catch (erro) {
    console.error('Erro ao fazer login:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao fazer login.',
    })
  }
}
const buscarPerfil = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        mensagem: 'O usuário é obrigatório.',
      })
    }

    const usuario = await Usuario.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'foto'],
    })

    if (!usuario) {
      return res.status(404).json({
        mensagem: 'Usuário não encontrado.',
      })
    }

    const atividades = await Atividade.findAll({
      where: {
        usuarioId: Number(id),
      },
      attributes: ['id', 'calorias'],
    })

    const totalAtividades = atividades.length

    const totalCalorias = atividades.reduce(
      (total, atividade) => total + Number(atividade.calorias),
      0
    )

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        foto: usuario.foto,
      },
      estatisticas: {
        totalAtividades,
        totalCalorias,
      },
    })
  } catch (erro) {
    console.error('Erro ao buscar perfil:', erro)

    return res.status(500).json({
      mensagem: 'Erro ao buscar perfil.',
    })
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  fazerLogin,
  buscarPerfil,
}