import { useEffect, useState } from 'react'
import './App.css'

const atividadesIniciais = [
  {
    id: 1,
    usuario: 'Usuário_01',
    tipo: 'Corrida',
    distancia: '10 km',
    duracao: '50 min',
    calorias: 350,
    likes: 4,
    comentarios: 4,
    data: '18:30 - 12/08/2024',
    curtido: false,
  },
  {
    id: 2,
    usuario: 'Usuário_02',
    tipo: 'Trilha',
    distancia: '10 km',
    duracao: '50 min',
    calorias: 350,
    likes: 5,
    comentarios: 4,
    data: '20:40 - 15/08/2024',
    curtido: false,
  },
  {
    id: 3,
    usuario: 'Usuário_01',
    tipo: 'Caminhada',
    distancia: '5 km',
    duracao: '50 min',
    calorias: 350,
    likes: 3,
    comentarios: 4,
    data: '05:30 - 09/07/2024',
    curtido: false,
  },
  {
    id: 4,
    usuario: 'Usuário_02',
    tipo: 'Corrida',
    distancia: '3 km',
    duracao: '50 min',
    calorias: 350,
    likes: 8,
    comentarios: 4,
    data: '17:20 - 07/07/2024',
    curtido: false,
  },
]

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  )
}

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.49 22H3.38l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.86h1.73L8.3 4.02H6.44L17.8 19.86Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v3.1c-1.5 0-2.7-.4-3.6-1.1v6.7c0 4.1-2.8 6.7-6.5 6.7-3.7 0-6.2-2.5-6.2-5.8 0-3.6 2.8-6 6.7-6.1v3.2c-2.1.1-3.3 1.1-3.3 2.8 0 1.5 1.1 2.6 2.8 2.6 1.8 0 3.2-1.3 3.2-3.5V3h3.4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconUsuario() {
  return (
    <svg
      className="icone-usuario"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
        fill="currentColor"
      />
      <path
        d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8H4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconCoracao({ curtido }) {
  return (
    <svg
      className={`icone-coracao ${curtido ? 'curtido' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        fill={curtido ? '#FF0000' : 'none'}
        stroke={curtido ? '#FF0000' : '#333333'}
        strokeWidth="2"
      />
    </svg>
  )
}

function IconChat() {
  return (
    <svg
      className="icone-chat"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.48 0-2.87-.38-4.08-1.05L3 20l1.05-4.42A8.46 8.46 0 0 1 3 11.5 8.5 8.5 0 1 1 20 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconSend() {
  return (
    <svg
      className="icone-send"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M22 2 11 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m22 2-7 20-4-9-9-4 20-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconAtividade() {
  return (
    <svg
      className="icone-atividade-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4 20V10M9 20V4M14 20v-7M19 20V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function formatarDuracao(minutos) {
  const horas = minutos / 60

  if (Number.isInteger(horas)) {
    return `${horas} h`
  }

  return `${horas.toFixed(1)} h`
}

function App() {
  const [logado, setLogado] = useState(() => {
    return Boolean(localStorage.getItem('saepsaude_usuario'))
  })

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('saepsaude_usuario')

    if (!usuarioSalvo) {
      return null
    }

    try {
      return JSON.parse(usuarioSalvo)
    } catch (erro) {
      localStorage.removeItem('saepsaude_usuario')
      return null
    }
  })
  const [estatisticasUsuario, setEstatisticasUsuario] = useState({
    totalAtividades: 0,
    totalCalorias: 0,
  })
  const [mostrarLogin, setMostrarLogin] = useState(false)

  const [filtro, setFiltro] = useState('Todos')
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [limite, setLimite] = useState(4)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [atividades, setAtividades] = useState([])

  const [comentarioAberto, setComentarioAberto] =
    useState(null)

  const [novoComentario, setNovoComentario] =
    useState('')

  const [comentariosPorAtividade, setComentariosPorAtividade] =
    useState({})

  const [mostrarFormularioAtividade, setMostrarFormularioAtividade] =
    useState(false)

  const [tipoAtividade, setTipoAtividade] =
    useState('')

  const [distanciaAtividade, setDistanciaAtividade] =
    useState('')

  const [duracaoAtividade, setDuracaoAtividade] =
    useState('')

  const [caloriasAtividade, setCaloriasAtividade] =
    useState('')

  const [errosFormulario, setErrosFormulario] =
    useState({})

  const atividadesFiltradas = atividades

  const carregarAtividades = async () => {
    try {
      const parametros = new URLSearchParams({
        pagina: String(pagina),
        limite: String(limite),
      })

      if (filtro !== 'Todos') {
        parametros.set('tipo', filtro.toLowerCase())
      }

      if (usuarioLogado?.id) {
        parametros.set('usuarioId', String(usuarioLogado.id))
      }

      const resposta = await fetch(
        `http://localhost:3000/atividades?${parametros.toString()}`
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        throw new Error(
          dados.mensagem || 'Erro ao buscar atividades.'
        )
      }

      const paginas = Math.max(
        Number(dados.paginacao?.totalPaginas) || 1,
        1
      )

      setTotalPaginas(paginas)

      if (pagina > paginas) {
        setPagina(paginas)
        return
      }

      const atividadesFormatadas = dados.atividades.map(
        (atividade) => {
          const dataCriacao = new Date(atividade.createdAt)

          return {
            id: atividade.id,
            usuario: atividade.usuario?.nome || 'Usuário',
            tipo:
              atividade.tipo.charAt(0).toUpperCase() +
              atividade.tipo.slice(1),
            distancia: `${Number(atividade.distancia) / 1000} km`,
            duracao: formatarDuracao(
              Number(atividade.duracao)
            ),
            calorias: Number(atividade.calorias),
            likes: Number(atividade.curtidas),
            comentarios: Number(atividade.comentarios),
            data:
              dataCriacao.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }) +
              ' - ' +
              dataCriacao.toLocaleDateString('pt-BR'),
            curtido: Boolean(atividade.curtidoPeloUsuario),
          }
        }
      )

      setAtividades(atividadesFormatadas)
    } catch (erro) {
      console.error('Erro ao carregar atividades:', erro)
      setAtividades([])
      setTotalPaginas(1)
    }
  }

  useEffect(() => {
    carregarAtividades()
  }, [pagina, filtro, limite, usuarioLogado?.id])

  useEffect(() => {
    const carregarPerfil = async () => {
      if (!usuarioLogado?.id) {
        return
      }

      try {
        const resposta = await fetch(
          `http://localhost:3000/usuarios/${usuarioLogado.id}`
        )

        const dados = await resposta.json()

        if (resposta.ok) {
          setEstatisticasUsuario(dados.estatisticas)
        }
      } catch (erro) {
        console.error('Erro ao buscar perfil:', erro)
      }
    }

    carregarPerfil()
  }, [usuarioLogado?.id])

  const abrirLogin = () => {
    setMostrarLogin(true)
  }

  const fecharLogin = () => {
    setMostrarLogin(false)
    setEmail('')
    setSenha('')
  }

  const fazerLogin = async (event) => {
    event.preventDefault()

    if (!email || !senha) {
      return
    }

    try {
      const resposta = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.mensagem || 'Email ou senha inválidos.')
        return
      }

      setUsuarioLogado(dados.usuario)
      setLogado(true)

      localStorage.setItem(
        'saepsaude_usuario',
        JSON.stringify(dados.usuario)
      )

      fecharLogin()
    } catch (erro) {
      console.error('Erro ao fazer login:', erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  const fazerLogout = () => {
    localStorage.removeItem('saepsaude_usuario')

    setLogado(false)
    setUsuarioLogado(null)
    setEstatisticasUsuario({
      totalAtividades: 0,
      totalCalorias: 0,
    })
    setComentarioAberto(null)
    setMostrarFormularioAtividade(false)
    setFiltro('Todos')
    setPagina(1)
  }

  const exigirLogin = (acao) => {
    if (!logado) {
      abrirLogin()
      return
    }

    acao()
  }

  const selecionarFiltro = (novoFiltro) => {
    exigirLogin(() => {
      if (filtro === novoFiltro) {
        setFiltro('Todos')
      } else {
        setFiltro(novoFiltro)
      }

      setPagina(1)
    })
  }

  const selecionarPagina = (numero) => {
    exigirLogin(() => {
      const paginaValida = Math.min(
        Math.max(numero, 1),
        totalPaginas
      )

      setPagina(paginaValida)
    })
  }

  const alterarLimite = (novoLimite) => {
    exigirLogin(() => {
      setLimite(Number(novoLimite))
      setPagina(1)
    })
  }

  const abrirFormularioAtividade = () => {
    exigirLogin(() => {
      setMostrarFormularioAtividade(true)
      setComentarioAberto(null)
    })
  }

  const atualizarSomenteNumeros = (
    valor,
    setter
  ) => {
    const somenteNumeros =
      valor.replace(/\D/g, '')

    setter(somenteNumeros)
  }

  const criarAtividade = async (event) => {
    event.preventDefault()

    const novosErros = {}

    if (!tipoAtividade) {
      novosErros.tipo = true
    }

    if (!distanciaAtividade) {
      novosErros.distancia = true
    }

    if (!duracaoAtividade) {
      novosErros.duracao = true
    }

    if (!caloriasAtividade) {
      novosErros.calorias = true
    }

    if (Object.keys(novosErros).length > 0) {
      setErrosFormulario(novosErros)
      return
    }

    const tiposPermitidos = [
      'corrida',
      'caminhada',
      'trilha',
    ]

    const tipoFormatado =
      tipoAtividade.trim().toLowerCase()

    if (!tiposPermitidos.includes(tipoFormatado)) {
      setErrosFormulario({
        tipo: true,
      })
      return
    }

    if (!usuarioLogado?.id) {
      abrirLogin()
      return
    }

    try {
      const resposta = await fetch(
        'http://localhost:3000/atividades',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo: tipoFormatado,
            distancia: Number(distanciaAtividade),
            duracao: Number(duracaoAtividade),
            calorias: Number(caloriasAtividade),
            usuarioId: usuarioLogado.id,
          }),
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(
          dados.mensagem ||
            'Não foi possível cadastrar a atividade.'
        )
        return
      }

      setTipoAtividade('')
      setDistanciaAtividade('')
      setDuracaoAtividade('')
      setCaloriasAtividade('')
      setErrosFormulario({})
      setFiltro('Todos')
      setPagina(1)
      setMostrarFormularioAtividade(false)

      if (filtro === 'Todos' && pagina === 1) {
        await carregarAtividades()
      }

      try {
        const respostaPerfil = await fetch(
          `http://localhost:3000/usuarios/${usuarioLogado.id}`
        )

        const dadosPerfil = await respostaPerfil.json()

        if (respostaPerfil.ok) {
          setEstatisticasUsuario(dadosPerfil.estatisticas)
        }
      } catch (erro) {
        console.error(
          'Erro ao atualizar estatísticas:',
          erro
        )
      }
    } catch (erro) {
      console.error(
        'Erro ao cadastrar atividade:',
        erro
      )
      alert(
        'Não foi possível conectar ao servidor.'
      )
    }
  }

  const curtirAtividade = async (id) => {
    if (!logado) {
      abrirLogin()
      return
    }

    if (!usuarioLogado?.id) {
      return
    }

    try {
      const resposta = await fetch(
        'http://localhost:3000/curtidas',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuarioId: usuarioLogado.id,
            atividadeId: id,
          }),
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(
          dados.mensagem ||
            'Não foi possível processar a curtida.'
        )
        return
      }

      await carregarAtividades()
    } catch (erro) {
      console.error('Erro ao curtir atividade:', erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  const carregarComentarios = async (id) => {
    try {
      const resposta = await fetch(
        `http://localhost:3000/comentarios/${id}`
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        throw new Error(
          dados.mensagem || 'Erro ao buscar comentários.'
        )
      }

      setComentariosPorAtividade((atuais) => ({
        ...atuais,
        [id]: dados,
      }))
    } catch (erro) {
      console.error('Erro ao carregar comentários:', erro)
      setComentariosPorAtividade((atuais) => ({
        ...atuais,
        [id]: [],
      }))
      alert('Não foi possível carregar os comentários.')
    }
  }

  const abrirComentarios = (id) => {
    exigirLogin(async () => {
      const vaiAbrir = comentarioAberto !== id

      setComentarioAberto(vaiAbrir ? id : null)
      setNovoComentario('')

      if (vaiAbrir) {
        await carregarComentarios(id)
      }
    })
  }

  const enviarComentario = async (id) => {
    if (!logado) {
      abrirLogin()
      return
    }

    if (!usuarioLogado?.id) {
      return
    }

    const texto = novoComentario.trim()

    if (texto.length === 0) {
      alert(
        'não é possível enviar um comentário vazio'
      )
      return
    }

    if (texto.length <= 2) {
      alert(
        'O comentário deve ter mais de 2 caracteres.'
      )
      return
    }

    try {
      const resposta = await fetch(
        'http://localhost:3000/comentarios',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            texto,
            usuarioId: usuarioLogado.id,
            atividadeId: id,
          }),
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(
          dados.mensagem ||
            'Não foi possível enviar o comentário.'
        )
        return
      }

      setNovoComentario('')

      await carregarComentarios(id)
      await carregarAtividades()
    } catch (erro) {
      console.error('Erro ao enviar comentário:', erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  const totalAtividades = logado
    ? estatisticasUsuario.totalAtividades
    : atividades.length

  const totalCalorias = logado
    ? estatisticasUsuario.totalCalorias
    : atividades.reduce(
        (total, atividade) =>
          total + atividade.calorias,
        0
      )

  return (
    <div className="pagina">

      <aside className="perfil">

        <div className="perfil-conteudo">

          <div className="logo-area">
            <div className="logo-placeholder">
              <span>SAEP</span>
              <strong>SAÚDE</strong>
            </div>
          </div>

          <h1 className="nome-logo">
            {logado ? usuarioLogado?.nome : 'SAEPSaúde'}
          </h1>

          <div className="estatisticas">

            <div className="estatistica">
              <strong>
                {totalAtividades}
              </strong>
              <span>
                Qtd. Atividades
              </span>
            </div>

            <div className="estatistica">
              <strong>
                {totalCalorias}
              </strong>
              <span>
                Qtd. Calorias
              </span>
            </div>

          </div>

          <button
            className={`botao-atividade ${
              mostrarFormularioAtividade
                ? 'selecionado'
                : ''
            } ${
              !logado
                ? 'desabilitado'
                : ''
            }`}
            disabled={!logado}
            onClick={
              abrirFormularioAtividade
            }
          >
            <IconAtividade />

            Atividade
          </button>

        </div>

        <footer className="rodape">

          <strong>SAEPSaúde</strong>

          <div className="redes">

            <span title="Instagram">
              <IconInstagram />
            </span>

            <span title="Twitter">
              <IconTwitter />
            </span>

            <span title="TikTok">
              <IconTikTok />
            </span>

          </div>

          <small>
            Copyright-2026
          </small>

        </footer>

      </aside>

      <main className="main">

        <header className="cabecalho">

          <button
            className={`botao-login ${
              logado
                ? 'botao-logout'
                : ''
            }`}
            onClick={
              logado
                ? fazerLogout
                : abrirLogin
            }
          >
            {logado
              ? 'Logout'
              : 'Login'}
          </button>

        </header>

        {/* FILTROS */}
        <nav className="filtros">

          <button
            className={
              filtro === 'Corrida'
                ? 'filtro ativo'
                : 'filtro'
            }
            onClick={() =>
              selecionarFiltro(
                'Corrida'
              )
            }
          >
            Corrida
          </button>

          <button
            className={
              filtro === 'Caminhada'
                ? 'filtro ativo'
                : 'filtro'
            }
            onClick={() =>
              selecionarFiltro(
                'Caminhada'
              )
            }
          >
            Caminhada
          </button>

          <button
            className={
              filtro === 'Trilha'
                ? 'filtro ativo'
                : 'filtro'
            }
            onClick={() =>
              selecionarFiltro(
                'Trilha'
              )
            }
          >
            Trilha
          </button>

        </nav>

        {mostrarFormularioAtividade && (

          <section className="formulario-atividade">

            <h2>
              Crie sua atividade
            </h2>

            <form
              onSubmit={
                criarAtividade
              }
              className="form-atividade"
            >

              <div
                className={`campo-atividade ${
                  errosFormulario.tipo
                    ? 'campo-erro'
                    : ''
                }`}
              >
                <label htmlFor="tipo-atividade">
                  Tipo da atividade
                </label>

                <input
                  id="tipo-atividade"
                  type="text"
                  list="tipos-atividade"
                  placeholder="Ex: Caminhada"
                  value={
                    tipoAtividade
                  }
                  onChange={(event) => {
                    setTipoAtividade(
                      event.target.value
                    )

                    setErrosFormulario(
                      (erros) => ({
                        ...erros,
                        tipo: false,
                      })
                    )
                  }}
                />

                <datalist id="tipos-atividade">
                  <option value="Corrida" />
                  <option value="Caminhada" />
                  <option value="Trilha" />
                </datalist>

                {errosFormulario.tipo && (
                  <span className="mensagem-erro">
                    Campo obrigatório
                  </span>
                )}
              </div>

              <div
                className={`campo-atividade ${
                  errosFormulario.distancia
                    ? 'campo-erro'
                    : ''
                }`}
              >
                <label htmlFor="distancia-atividade">
                  Distância percorrida
                </label>

                <input
                  id="distancia-atividade"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 1000 metros"
                  value={
                    distanciaAtividade
                  }
                  onChange={(event) =>
                    atualizarSomenteNumeros(
                      event.target.value,
                      setDistanciaAtividade
                    )
                  }
                />

                {errosFormulario.distancia && (
                  <span className="mensagem-erro">
                    Campo obrigatório
                  </span>
                )}
              </div>

              <div
                className={`campo-atividade ${
                  errosFormulario.duracao
                    ? 'campo-erro'
                    : ''
                }`}
              >
                <label htmlFor="duracao-atividade">
                  Duração da atividade
                </label>

                <input
                  id="duracao-atividade"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 120 min"
                  value={
                    duracaoAtividade
                  }
                  onChange={(event) =>
                    atualizarSomenteNumeros(
                      event.target.value,
                      setDuracaoAtividade
                    )
                  }
                />

                {errosFormulario.duracao && (
                  <span className="mensagem-erro">
                    Campo obrigatório
                  </span>
                )}
              </div>

              <div
                className={`campo-atividade ${
                  errosFormulario.calorias
                    ? 'campo-erro'
                    : ''
                }`}
              >
                <label htmlFor="calorias-atividade">
                  Quantidade de Calorias
                </label>

                <input
                  id="calorias-atividade"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 300"
                  value={
                    caloriasAtividade
                  }
                  onChange={(event) =>
                    atualizarSomenteNumeros(
                      event.target.value,
                      setCaloriasAtividade
                    )
                  }
                />

                {errosFormulario.calorias && (
                  <span className="mensagem-erro">
                    Campo obrigatório
                  </span>
                )}
              </div>

              <div className="area-botao-criar">
                <button
                  type="submit"
                  className="botao-criar-atividade"
                >
                  Criar Atividade
                </button>
              </div>

            </form>

          </section>

        )}

        <section className="lista-atividades">

          {mostrarFormularioAtividade && (
            <h2 className="titulo-suas-atividades">
              Suas Atividades
            </h2>
          )}

          {atividadesFiltradas.map(
            (atividade) => (

              <article
                className="atividade-card"
                key={atividade.id}
              >

                <div className="avatar">
                  <IconUsuario />
                </div>

                <div className="usuario">
                  <strong>
                    {atividade.usuario}
                  </strong>
                </div>

                <div className="tipo">
                  <strong>
                    {atividade.tipo}
                  </strong>
                </div>

                <div className="data">
                  {atividade.data}
                </div>

                <div className="informacoes">

                  <div>
                    <strong>
                      {atividade.distancia}
                    </strong>

                    <span>
                      Distância
                    </span>
                  </div>

                  <div>
                    <strong>
                      {atividade.duracao}
                    </strong>

                    <span>
                      Duração
                    </span>
                  </div>

                  <div>
                    <strong>
                      {atividade.calorias}
                    </strong>

                    <span>
                      Calorias
                    </span>
                  </div>

                </div>

                <div className="acoes">

                  <button
                    onClick={() =>
                      curtirAtividade(
                        atividade.id
                      )
                    }
                    title="Curtir atividade"
                  >
                    <IconCoracao
                      curtido={
                        atividade.curtido
                      }
                    />

                    <span>
                      {atividade.likes}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      abrirComentarios(
                        atividade.id
                      )
                    }
                    title="Comentar atividade"
                  >
                    <IconChat />

                    <span>
                      {atividade.comentarios}
                    </span>
                  </button>

                </div>

                {comentarioAberto ===
                  atividade.id && (

                  <div
                    className="area-comentario"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      boxSizing: 'border-box',
                      gap: '10px',
                      padding: '12px 10px 10px',
                      marginTop: '8px',
                      borderTop: '1px solid #dddddd',
                    }}
                  >

                    {comentariosPorAtividade[atividade.id]?.length > 0 && (
                      <div
                        className="lista-comentarios"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          width: '100%',
                        }}
                      >
                        {comentariosPorAtividade[atividade.id].map((comentario) => (
                          <div
                            className="comentario-item"
                            key={comentario.id}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              gap: '2px',
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '5px 8px',
                            }}
                          >
                            <strong
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                lineHeight: '18px',
                              }}
                            >
                              {comentario.Usuario?.nome || 'Usuário'}
                            </strong>

                            <span
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                lineHeight: '18px',
                                wordBreak: 'break-word',
                              }}
                            >
                              {comentario.texto}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: '6px',
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Escrever um comentário…"
                        value={novoComentario}
                        onChange={(event) =>
                          setNovoComentario(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            enviarComentario(atividade.id)
                          }
                        }}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          boxSizing: 'border-box',
                        }}
                      />

                      <button
                        type="button"
                        title="Enviar comentário"
                        onClick={() =>
                          enviarComentario(atividade.id)
                        }
                        style={{
                          flexShrink: 0,
                        }}
                      >
                        <IconSend />
                      </button>
                    </div>

                  </div>

                )}

              </article>

            )
          )}

        </section>

        <div className="paginacao">

          <button
            disabled={pagina === 1}
            onClick={() => selecionarPagina(pagina - 1)}
          >
            Anterior
          </button>

          <button className="pagina-ativa" disabled>
            {pagina}
          </button>

          <button
            disabled={pagina === totalPaginas}
            onClick={() => selecionarPagina(pagina + 1)}
          >
            Próxima
          </button>

        </div>

      </main>

      {mostrarLogin && (

        <div className="modal-overlay">

          <div className="modal-login">

            <div className="modal-cabecalho">

              <h2>Login</h2>

              <button
                className="fechar-modal"
                onClick={
                  fecharLogin
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                fazerLogin
              }
            >

              <div className="campo">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="campo">

                <label htmlFor="senha">
                  Senha
                </label>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(event) =>
                    setSenha(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="botoes-modal">

                <button
                  type="submit"
                  className="botao-modal-login"
                >
                  Login
                </button>

                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={
                    fecharLogin
                  }
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default App