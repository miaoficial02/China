const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender] || {}

  // Convertir y asegurar que son números válidos
  const monedas = Number(user.cookies)
  const xp = Number(user.exp)
  const nivel = Number(user.level)

  const monedasValidas = isNaN(monedas) ? 0 : monedas
  const xpValidas = isNaN(xp) ? 0 : xp
  const nivelValido = isNaN(nivel) ? 0 : nivel

  const mensaje = `
╭━━━〔 *📊 ESTADO DE TU CUENTA* 〕━━━⬣
┃🪙 Monedas: *${monedasValidas.toLocaleString()}*
┃✨ Experiencia: *${xpValidas.toLocaleString()}*
┃🔝 Nivel: *${nivelValido}*
╰━━━━━━━━━━━━━━━━━━━━━━⬣
`

  return conn.reply(m.chat, mensaje.trim(), m)
}

handler.help = ['miestatus', 'mimonedas', 'miexp']
handler.tags = ['rpg', 'economia']
handler.command = ['miestatus', 'mismonedas', 'miexp']
handler.register = true
export default handler