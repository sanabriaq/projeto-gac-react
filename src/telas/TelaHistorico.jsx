import { useState, useEffect } from 'react'
import { buscarDado, deletarDado, listarChaves } from '../utils/storage'
import { REFEICOES } from '../utils/refeicoes'

function TelaHistorico({ usuario, voltar, irParaAgendar, mostrarMensagem }) {
  const [agendamentos, setAgendamentos] = useState([])

  useEffect(() => {
    carregar()
  }, [])

  function carregar() {
    const chaves = listarChaves(`agendamento:${usuario.id}:`)
    const lista = chaves.map(c => {
      const ag = buscarDado(c)
      return { ...ag, _key: c }
    }).filter(Boolean)
    lista.sort((a, b) => b.data.localeCompare(a.data))
    setAgendamentos(lista)
  }

  function excluir(key) {
    deletarDado(key)
    mostrarMensagem('Agendamento removido', 'sucesso')
    carregar()
  }

  function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split('-')
    return `${dia}/${mes}/${ano}`
  }

  const hoje = new Date().toISOString().split('T')[0]

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <img src="/img/2_GAC.png" alt="Brasão" className="header-brasao" />
          <div>
            <div className="header-titulo">MEUS AGENDAMENTOS</div>
            <div className="header-sub">{usuario?.id}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={voltar}>
          <span>✕</span> VOLTAR
        </button>
      </header>

      {agendamentos.length === 0 ? (
        <div className="vazio">
          <div style={{ fontSize: 48 }}>📅</div>
          <div style={{ marginTop: 12 }}>Nenhum agendamento ainda</div>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={irParaAgendar}>
            AGENDAR AGORA <span className="seta">›</span>
          </button>
        </div>
      ) : (
        <div className="lista-agendamentos">
          {agendamentos.map((ag, i) => {
            const passado = ag.data < hoje
            return (
              <div key={i} className={`agendamento-card ${passado ? 'passado' : ''}`}>
                <div className="agendamento-header">
                  <div>
                    <div className="agendamento-data">{formatarData(ag.data)}</div>
                    <div className="agendamento-status">
                      {passado ? '✓ Realizado' : '⏳ Agendado'}
                    </div>
                  </div>
                  {!passado && (
                    <button className="btn-delete" onClick={() => excluir(ag._key)}>X</button>
                  )}
                </div>
                <div className="agendamento-refs">
                  {ag.refeicoes.map(r => (
                    <div key={r} className="refeicao-item">
                      {REFEICOES[r].icon} {REFEICOES[r].nome}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TelaHistorico