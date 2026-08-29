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
    avatar: '👩🏻',
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
    avatar: '👨🏿',
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
    avatar: '👩🏻',
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
    avatar: '👨🏿',
  },
]

function App() {
  const [logado, setLogado] = useState(false)
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [filtro, setFiltro] = useState('Todos')
  const [pagina, setPagina] = useState(1)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const atividades =
    filtro === 'Todos'
      ? atividadesIniciais
      : atividadesIniciais.filter(
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
      setFiltro(novoFiltro)
      setPagina(1)
    })
  }

  const selecionarPagina = (numero) => {
    exigirLogin(() => {
      setPagina(numero)
    })
  }

  const totalAtividades = atividadesIniciais.length

  const totalCalorias = atividadesIniciais.reduce(
    (total, atividade) => total + atividade.calorias,
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

          <h1 className="nome-logo">SAEPSaúde</h1>

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
            className={`botao-atividade ${!logado ? 'desabilitado' : ''}`}
            disabled={!logado}
            onClick={() => exigirLogin(() => {})}
          >
            <span className="icone-atividade">▥</span>
            Atividade
          </button>

        </div>

        {/* RODAPÉ */}
        <footer className="rodape">

          <strong>SAEPSaúde</strong>

          <div className="redes">

            <span title="Instagram">◎</span>
            <span title="Twitter">♥</span>
            <span title="TikTok">♪</span>

          </div>

          <small>Copyright-2024</small>

        </footer>

      </aside>

      <main className="main">

        <header className="cabecalho">

          <button
            className="botao-login"
            onClick={logado ? () => setLogado(false) : abrirLogin}
          >
            {logado ? 'Logout' : 'Login'}
          </button>

        </header>

        <nav className="filtros">

          <button
            className={filtro === 'Corrida' ? 'filtro ativo' : 'filtro'}
            onClick={() => selecionarFiltro('Corrida')}
          >
            Corrida
          </button>

          <button
            className={filtro === 'Caminhada' ? 'filtro ativo' : 'filtro'}
            onClick={() => selecionarFiltro('Caminhada')}
          >
            Caminhada
          </button>

          <button
            className={filtro === 'Trilha' ? 'filtro ativo' : 'filtro'}
            onClick={() => selecionarFiltro('Trilha')}
          >
            Trilha
          </button>

        </nav>

        <section className="lista-atividades">

          {atividades.map((atividade) => (

            <article className="atividade-card" key={atividade.id}>

              <div className="avatar">
                {atividade.avatar}
              </div>

              <div className="usuario">
                <strong>{atividade.usuario}</strong>
              </div>

              <div className="tipo">
                <strong>{atividade.tipo}</strong>
              </div>

              <div className="data">
                {atividade.data}
              </div>

              <div className="informacoes">

                <div>
                  <strong>{atividade.distancia}</strong>
                  <span>Distância</span>
                </div>

                <div>
                  <strong>{atividade.duracao}</strong>
                  <span>Duração</span>
                </div>

                <div>
                  <strong>{atividade.calorias}</strong>
                  <span>Calorias</span>
                </div>

              </div>

              <div className="acoes">

                <button
                  onClick={() =>
                    exigirLogin(() => {})
                  }
                  title="Curtir atividade"
                >
                  ♡ <span>{atividade.likes}</span>
                </button>

                <button
                  onClick={() =>
                    exigirLogin(() => {})
                  }
                  title="Comentar atividade"
                >
                  ▤ <span>{atividade.comentarios}</span>
                </button>

              </div>

            </article>

          ))}

        </section>


        <div className="paginacao">

          <button
            onClick={() => selecionarPagina(Math.max(1, pagina - 1))}
          >
            Anterior
          </button>

          <button
            className={pagina === 1 ? 'pagina-ativa' : ''}
            onClick={() => selecionarPagina(1)}
          >
            1
          </button>

          <button
            className={pagina === 2 ? 'pagina-ativa' : ''}
            onClick={() => selecionarPagina(2)}
          >
            2
          </button>

          <button
            className={pagina === 3 ? 'pagina-ativa' : ''}
            onClick={() => selecionarPagina(3)}
          >
            3
          </button>

          <button
            onClick={() => selecionarPagina(Math.min(3, pagina + 1))}
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
                    setEmail(event.target.value)
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
                    setSenha(event.target.value)
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