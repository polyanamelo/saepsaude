import { useState } from 'react'
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

function App() {
  const [logado, setLogado] = useState(false)
  const [mostrarLogin, setMostrarLogin] = useState(false)

  const [filtro, setFiltro] = useState('Todos')
  const [pagina, setPagina] = useState(1)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [atividades, setAtividades] = useState(atividadesIniciais)

  const [comentarioAberto, setComentarioAberto] = useState(null)
  const [novoComentario, setNovoComentario] = useState('')

  const atividadesFiltradas =
    filtro === 'Todos'
      ? atividades
      : atividades.filter(
          (atividade) => atividade.tipo === filtro
        )

  const abrirLogin = () => {
    setMostrarLogin(true)
  }

  const fecharLogin = () => {
    setMostrarLogin(false)
    setEmail('')
    setSenha('')
  }

  const fazerLogin = (event) => {
    event.preventDefault()

    if (!email || !senha) {
      return
    }

    setLogado(true)
    fecharLogin()
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

      // Se clicar novamente no filtro que já está selecionado,
      // volta a mostrar todas as atividades.
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
      setPagina(numero)
    })
  }

  const curtirAtividade = (id) => {
    exigirLogin(() => {
      setAtividades((atividadesAtuais) =>
        atividadesAtuais.map((atividade) => {

          if (atividade.id !== id) {
            return atividade
          }

          if (atividade.curtido) {
            return {
              ...atividade,
              likes: atividade.likes - 1,
              curtido: false,
            }
          }

          return {
            ...atividade,
            likes: atividade.likes + 1,
            curtido: true,
          }
        })
      )
    })
  }

  const abrirComentarios = (id) => {
    exigirLogin(() => {
      setComentarioAberto((atual) =>
        atual === id ? null : id
      )

      setNovoComentario('')
    })
  }

  const enviarComentario = (id) => {
    exigirLogin(() => {

      if (novoComentario.trim().length <= 2) {
        alert(
          'não é possível enviar um comentário vazio'
        )
        return
      }

      setAtividades((atividadesAtuais) =>
        atividadesAtuais.map((atividade) => {

          if (atividade.id !== id) {
            return atividade
          }

          return {
            ...atividade,
            comentarios: atividade.comentarios + 1,
          }
        })
      )

      setNovoComentario('')
    })
  }

  const totalAtividades = atividades.length

  const totalCalorias = atividades.reduce(
    (total, atividade) =>
      total + atividade.calorias,
    0
  )

  return (
    <div className="pagina">

      {/* COLUNA ESQUERDA */}
      <aside className="perfil">

        <div className="perfil-conteudo">

          <div className="logo-area">

            <div className="logo-placeholder">
              <span>SAEP</span>
              <strong>SAÚDE</strong>
            </div>

          </div>

          {/* Futuramente será substituído pelo nome
              do usuário logado vindo do banco. */}
          <h1 className="nome-logo">
            SAEPSaúde
          </h1>

          <div className="estatisticas">

            <div className="estatistica">
              <strong>{totalAtividades}</strong>
              <span>Qtd. Atividades</span>
            </div>

            <div className="estatistica">
              <strong>{totalCalorias}</strong>
              <span>Qtd. Calorias</span>
            </div>

          </div>

          <button
            className={`botao-atividade ${
              !logado ? 'desabilitado' : ''
            }`}
            disabled={!logado}
            onClick={() =>
              exigirLogin(() => {})
            }
          >
            <span className="icone-atividade">
              ▥
            </span>

            Atividade
          </button>

        </div>

        {/* RODAPÉ */}
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
            Copyright-2024
          </small>

        </footer>

      </aside>

      <main className="main">

        <header className="cabecalho">

          <button
            className={`botao-login ${
              logado ? 'botao-logout' : ''
            }`}
            onClick={
              logado
                ? () => {
                    setLogado(false)
                    setComentarioAberto(null)
                  }
                : abrirLogin
            }
          >
            {logado ? 'Logout' : 'Login'}
          </button>

        </header>

        <nav className="filtros">

          <button
            className={
              filtro === 'Corrida'
                ? 'filtro ativo'
                : 'filtro'
            }
            onClick={() =>
              selecionarFiltro('Corrida')
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
              selecionarFiltro('Caminhada')
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
              selecionarFiltro('Trilha')
            }
          >
            Trilha
          </button>

        </nav>

        <section className="lista-atividades">

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

                  <div className="area-comentario">

                    <input
                      type="text"
                      placeholder="Escrever um comentário…"
                      value={novoComentario}
                      onChange={(event) =>
                        setNovoComentario(
                          event.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      title="Enviar comentário"
                      onClick={() =>
                        enviarComentario(
                          atividade.id
                        )
                      }
                    >
                      <IconSend />
                    </button>

                  </div>

                )}

              </article>

            )
          )}

        </section>

        <div className="paginacao">

          <button
            onClick={() =>
              selecionarPagina(
                Math.max(1, pagina - 1)
              )
            }
          >
            Anterior
          </button>

          <button
            className={
              pagina === 1
                ? 'pagina-ativa'
                : ''
            }
            onClick={() =>
              selecionarPagina(1)
            }
          >
            1
          </button>

          <button
            className={
              pagina === 2
                ? 'pagina-ativa'
                : ''
            }
            onClick={() =>
              selecionarPagina(2)
            }
          >
            2
          </button>

          <button
            className={
              pagina === 3
                ? 'pagina-ativa'
                : ''
            }
            onClick={() =>
              selecionarPagina(3)
            }
          >
            3
          </button>

          <button
            onClick={() =>
              selecionarPagina(
                Math.min(
                  3,
                  pagina + 1
                )
              )
            }
          >
            Próximo
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
                onClick={fecharLogin}
              >
                ×
              </button>

            </div>

            <form onSubmit={fazerLogin}>

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
                  onClick={fecharLogin}
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