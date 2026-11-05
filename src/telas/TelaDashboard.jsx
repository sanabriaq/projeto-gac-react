import { useState, useEffect } from 'react'
import { buscarDado, listarChaves } from '../utils/storage'
import { REFEICOES } from '../utils/refeicoes'

function TelaDashboard({ usuario, irParaAgendar, irParaHistorico, onLogout }) {
  const [agendamentos, setAgendamentos] = useState([])

  useEffect(() => {
    if (!usuario) return
    const chaves = listarChaves(`agendamento:${usuario.id}:`)
    const lista = chaves.map(c => buscarDado(c)).filter(Boolean)
    lista.sort((a, b) => a.data.localeCompare(b.data))
    setAgendamentos(lista)
  }, [usuario])

  const hoje = new Date().toISOString().split('T')[0]
  const proximas = agendamentos.filter(a => a.data >= hoje).slice(0, 3)

  function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <img src="/img/2_GAC.png" alt="Brasão" className="header-brasao" />
          <div>
            <div className="header-titulo">2º GAC ITU - SP</div>
            <div className="header-sub">Sistema de Refeições</div>
          </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          <span>↩</span> SAIR
        </button>
      </header>

      <div className="card-usuario">
        <div className="avatar-usuario">
          <span className="avatar-icon">👤</span>
        </div>
        <div className="usuario-info">
          <div className="boas-vindas">BEM-VINDO</div>
          <div className="nome-usuario">{usuario?.id}</div>
          <div className="bateria-usuario">{usuario?.bateria}</div>
        </div>
      </div>

      <div className="menu-grid">
        <button className="menu-card" onClick={irParaAgendar}>
          <div className="menu-icon">📅</div>
          <div className="menu-titulo">AGENDAR REFEIÇÃO</div>
          <div className="menu-desc">Marcar refeições para um dia</div>
        </button>
        <button className="menu-card" onClick={irParaHistorico}>
          <div className="menu-icon">🕐</div>
          <div className="menu-titulo">MEUS AGENDAMENTOS</div>
          <div className="menu-desc">{agendamentos.length} agendamento(s)</div>
        </button>
      </div>

      <div className="proximas-refeicoes">
        <div className="section-titulo"><span>🍽️</span> PRÓXIMAS REFEIÇÕES</div>
        {proximas.length === 0 ? (
          <div className="vazio">Nenhuma refeição agendada</div>
        ) : (
          proximas.map((ag, i) => (
            <div key={i} className="proxima-card">
              <div className="proxima-data">{formatarData(ag.data)}</div>
              <div className="proxima-refs">
                {ag.refeicoes.map(r => (
                  <span key={r} className="tag-refeicao">{REFEICOES[r].nome}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TelaDashboard