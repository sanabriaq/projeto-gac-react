import { useState } from 'react'
import { salvarDado, buscarDado } from '../utils/storage'
import { REFEICOES } from '../utils/refeicoes'

function TelaAgendar({ usuario, voltar, irParaHistorico, mostrarMensagem }) {
  const hoje = new Date().toISOString().split('T')[0]
  const [data, setData] = useState(hoje)
  const [selecionadas, setSelecionadas] = useState([])

  function toggleRefeicao(id) {
    setSelecionadas(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  function salvarAgendamento() {
    if (selecionadas.length === 0)
      return mostrarMensagem('Selecione pelo menos uma refeição', 'erro')
    if (data < hoje)
      return mostrarMensagem('Não é possível agendar para datas passadas', 'erro')

    const agendamento = {
      userId: usuario.id,
      nomeGuerra: usuario.nomeGuerra,
      posto: usuario.posto,
      bateria: usuario.bateria,
      data,
      refeicoes: selecionadas,
      registradoEm: new Date().toISOString()
    }

    salvarDado(`agendamento:${usuario.id}:${data}`, agendamento)
    mostrarMensagem('Refeições agendadas com sucesso!', 'sucesso')
    irParaHistorico()
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <img src="/img/2_GAC.png" alt="Brasão" className="header-brasao" />
          <div>
            <div className="header-titulo">AGENDAR REFEIÇÃO</div>
            <div className="header-sub">{usuario?.id}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={voltar}>
          <span>✕</span> VOLTAR
        </button>
      </header>

      <div className="form-agendar">
        <label className="label">DATA DA REFEIÇÃO</label>
        <input
          type="date"
          className="input"
          min={hoje}
          value={data}
          onChange={e => setData(e.target.value)}
        />

        <label className="label" style={{ marginTop: 24 }}>SELECIONE AS REFEIÇÕES</label>
        <div className="refeicoes-grid">
          {Object.entries(REFEICOES).map(([id, ref]) => (
            <button
              key={id}
              className={`refeicao-card ${selecionadas.includes(id) ? 'ativo' : ''}`}
              onClick={() => toggleRefeicao(id)}
            >
              <div className="refeicao-icon">{ref.icon}</div>
              <div className="refeicao-nome">{ref.nome}</div>
              <div className="refeicao-horario">{ref.horario}</div>
              {selecionadas.includes(id) && (
                <div className="check-badge">✓</div>
              )}
            </button>
          ))}
        </div>

        <button className="btn-primary" style={{ marginTop: 28 }} onClick={salvarAgendamento}>
          CONFIRMAR AGENDAMENTO
        </button>
      </div>
    </div>
  )
}

export default TelaAgendar