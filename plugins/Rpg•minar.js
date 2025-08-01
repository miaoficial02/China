let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  const cooldown = 10 * 60 * 1000 // 10 minutos
  const now = Date.now()

  // Si está en cooldown
  if (user.lastmiming && now - user.lastmiming < cooldown) {
    const timeLeft = msToTime(cooldown - (now - user.lastmiming))
    return conn.reply(m.chat, `🪨 *Sistema de minería en enfriamiento*\n⏳ Vuelve en: *${timeLeft}*`, m)
  }

  // Recursos aleatorios
  const cookies = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])
  const emerald = pickRandom([1, 5, 7, 8])
  const iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45])
  const gold = pickRandom([20, 5, 7, 8, 88, 40, 50])
  const coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100])
  const stone = pickRandom([200, 500, 700, 800, 900, 4000, 300])
  const hasil = pickRandom([200, 500, 800, 1000, 1300]) // experiencia

  // Requiere pico y energía
  if (user.pickaxedurability <= 0) return m.reply('❌ Tu pico está roto. Usa `!repararpico` o crea uno nuevo.')
  if (user.health < 50) return m.reply('💢 Estás muy débil para minar. Recupera energía primero.')

  // Aplicar recursos
  user.cookies += cookies
  user.iron += iron
  user.gold += gold
  user.emerald += emerald
  user.coal += coal
  user.stone += stone
  user.exp += hasil
  user.health -= 50
  user.pickaxedurability -= 30
  user.lastmiming = now

  // Mensaje tipo RPG
  let msg = `
⛏️ *MINA DE DATOS ACTIVADA*

⚠️ *Excavación completada*:
  🍪 Cookies: *+${cookies}*
  💚 Esmeraldas: *+${emerald}*
  🔩 Hierro: *+${iron}*
  🏅 Oro: *+${gold}*
  🕋 Carbón: *+${coal}*
  🪨 Piedra: *+${stone}*
  ✨ Experiencia: *+${hasil}*

🔧 Pico: -30 durabilidad
❤️ Energía: -50 HP
📅 Tiempo restante: *10 minutos*
`.trim()

  await conn.sendMessage(m.chat, { text: msg }, { quoted: m })
  await conn.react(m.chat, '⛏️')
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'mine', 'miming']
handler.register = true
export default handler

// Funciones auxiliares
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(ms) {
  const m = Math.floor((ms / 60000) % 60)
  const s = Math.floor((ms / 1000) % 60)
  return `${m}m ${s}s`
}