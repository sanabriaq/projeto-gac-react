import { useState } from 'react'
import { buscarDado, salvarDado } from '../utils/storage'

function TelaLogin({ onLogin, irParaCadastro, mostrarMensagem }) {
  const [identificador, setIdentificador] = useState('')

  function fazerLogin() {
    const id = identificador.trim().toUpperCase()
    if (!id) return mostrarMensagem('Informe sua identificação', 'erro')
    const user = buscarDado(`user:${id}`)
    if (!user) return mostrarMensagem('Militar não cadastrado. Faça o cadastro primeiro.', 'erro')
    salvarDado('sessao_ativa', { id })
    mostrarMensagem(`Bem-vindo de volta, ${id}!`, 'sucesso')
    onLogin(user)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="emblema-hero">
          <img src="/img/2_GAC.png" alt="Brasão 2º GAC" className="brasao" />
        </div>
        <h1 className="titulo">SISTEMA DE REFEIÇÕES</h1>
        <p className="subtitulo">2º GRUPO DE ARTILHARIA DE CAMPANHA</p>
        <div className="divisor"></div>
        <div className="form">
          <label className="label">IDENTIFICAÇÃO MILITAR</label>
          <input
            type="text"
            className="input"
            placeholder="P/G NOME DE GUERRA"
            value={identificador}
            onChange={e => setIdentificador(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fazerLogin()}
          />
          <button className="btn-primary" onClick={fazerLogin}>
            ENTRAR <span className="seta">›</span>
          </button>
          <div className="divisor-pequeno"><span>OU</span></div>
          <button className="btn-secondary" onClick={irParaCadastro}>
            CADASTRAR NOVO MILITAR
          </button>
        </div>
        <div className="rodape">ITU - SÃO PAULO - EXÉRCITO BRASILEIRO</div>
      </div>
    </div>
  )
}

export default TelaLogin