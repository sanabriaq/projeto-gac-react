import { useState, useEffect } from 'react'
import TelaLogin from './telas/TelaLogin'
import TelaCadastro from './telas/TelaCadastro'
import TelaDashboard from './telas/TelaDashboard'
import TelaAgendar from './telas/TelaAgendar'
import TelaHistorico from './telas/TelaHistorico'
import { buscarDado, deletarDado } from './utils/storage'

function App() {
  const [tela, setTela] = useState('login')
  const [usuario, setUsuario] = useState(null)
  const [toast, setToast] = useState({ visivel: false, texto: '', tipo: '' })

  useEffect(() => {
    const sessao = buscarDado('sessao_ativa')
    if (sessao && sessao.id) {
      const user = buscarDado(`user:${sessao.id}`)
      if (user) {
        setUsuario(user)
        setTela('dashboard')
        return
      }
    }
    setTela('login')
  }, [])

  function mostrarMensagem(texto, tipo) {
    setToast({ visivel: true, texto, tipo })
    setTimeout(() => setToast({ visivel: false, texto: '', tipo: '' }), 3500)
  }

  function handleLogin(user) {
    setUsuario(user)
    setTela('dashboard')
  }

  function handleLogout() {
    deletarDado('sessao_ativa')
    setUsuario(null)
    setTela('login')
  }

  return (
    <>
      <div className="bg-pattern"></div>

      {toast.visivel && (
        <div className={`toast ${toast.tipo}`}>
          {toast.tipo === 'sucesso' ? ' ' : '✕ '}{toast.texto}
        </div>
      )}

      {tela === 'login' && (
        <TelaLogin
          onLogin={handleLogin}
          irParaCadastro={() => setTela('cadastro')}
          mostrarMensagem={mostrarMensagem}
        />
      )}

      {tela === 'cadastro' && (
        <TelaCadastro
          onCadastro={handleLogin}
          voltar={() => setTela('login')}
          mostrarMensagem={mostrarMensagem}
        />
      )}

      {tela === 'dashboard' && (
        <TelaDashboard
          usuario={usuario}
          irParaAgendar={() => setTela('agendar')}
          irParaHistorico={() => setTela('historico')}
          onLogout={handleLogout}
          mostrarMensagem={mostrarMensagem}
        />
      )}

      {tela === 'agendar' && (
        <TelaAgendar
          usuario={usuario}
          voltar={() => setTela('dashboard')}
          irParaHistorico={() => setTela('historico')}
          mostrarMensagem={mostrarMensagem}
        />
      )}

      {tela === 'historico' && (
        <TelaHistorico
          usuario={usuario}
          voltar={() => setTela('dashboard')}
          irParaAgendar={() => setTela('agendar')}
          mostrarMensagem={mostrarMensagem}
        />
      )}
    </>
  )
}

export default App    