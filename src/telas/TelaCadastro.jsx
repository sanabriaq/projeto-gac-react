import { useState } from 'react'
import { buscarDado, salvarDado } from '../utils/storage'

function TelaCadastro({ onCadastro, voltar, mostrarMensagem }) {
  const [posto, setPosto] = useState('SD EV')
  const [bateria, setBateria] = useState('1ª BO')
  const [nome, setNome] = useState('')

  const postos = ['SD EV','SD EP','CB','3º SGT','2º SGT','1º SGT','ST','ASP','2º TEN','1º TEN','CAP','MAJ','TC','CEL']

  function fazerCadastro() {
    if (!nome.trim()) return mostrarMensagem('Informe seu nome de guerra', 'erro')
    const id = `${posto} ${nome.trim().toUpperCase()}`
    const existente = buscarDado(`user:${id}`)
    if (existente) return mostrarMensagem('Já existe um militar com este posto e nome', 'erro')

    const novoUser = {
      id,
      nomeGuerra: nome.trim().toUpperCase(),
      posto,
      bateria,
      cadastradoEm: new Date().toISOString()
    }

    salvarDado(`user:${id}`, novoUser)
    salvarDado('sessao_ativa', { id })
    mostrarMensagem(`Bem-vindo, ${id}!`, 'sucesso')
    onCadastro(novoUser)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="emblema-small">
          <img src="/img/2_GAC.png" alt="Brasão 2º GAC" className="brasao-small" />
        </div>
        <h1 className="titulo-small">CADASTRO DE MILITAR</h1>
        <div className="divisor"></div>
        <div className="form">
          <label className="label">POSTO / GRADUAÇÃO</label>
          <select className="select" value={posto} onChange={e => setPosto(e.target.value)}>
            {postos.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <label className="label">BATERIA</label>
          <div className="bateria-grid">
            {['1ª BO','2ª BO','3ª BM','BC/EM'].map(b => (
              <button
                key={b}
                type="button"
                className={`bateria-btn ${bateria === b ? 'ativo' : ''}`}
                onClick={() => setBateria(b)}
              >
                {b}
              </button>
            ))}
          </div>

          <label className="label">NOME DE GUERRA</label>
          <input
            type="text"
            className="input"
            placeholder="Ex: SANTOS"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          {nome.trim() && (
            <div className="preview">
              Sua identificação: <strong>{posto} {nome.trim().toUpperCase()}</strong>
            </div>
          )}

          <button className="btn-primary" onClick={fazerCadastro}>
            CONFIRMAR CADASTRO
          </button>
          <button className="btn-ghost" onClick={voltar}>
            VOLTAR AO LOGIN
          </button>
        </div>                                                             
      </div>
    </div>
  )
}

export default TelaCadastro