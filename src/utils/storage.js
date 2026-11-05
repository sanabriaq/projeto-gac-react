export function salvarDado(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor))
}

export function buscarDado(chave) {
  const valor = localStorage.getItem(chave)
  return valor ? JSON.parse(valor) : null
}

export function deletarDado(chave) {
  localStorage.removeItem(chave)
}

export function listarChaves(prefixo) {
  const chaves = []
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i)
    if (chave.startsWith(prefixo)) chaves.push(chave)
  }
  return chaves
}