let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user) return m.reply('❌ Usuario no encontrado en la base de datos.')

  const cooldown = 30 * 60 * 1000 // 30 minutos en milisegundos
  const now = Date.now()

  if (!user.lastCazar) user.lastCazar = 0

  if (now - user.lastCazar < cooldown) {
    const remaining = cooldown - (now - user.lastCazar)
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    return m.reply(`⏳ Debes esperar *${minutes}m ${seconds}s* para volver a usar el comando .cazar.`)
  }

  const objetos = ['🐗 Jabalí', '🐍 Serpiente', '🐺 Lobo', '🐉 Dragón', '🦅 Águila', '🐰 Conejo']
  const resultado = objetos[Math.floor(Math.random() * objetos.length)]
  const recompensa = Math.floor(Math.random() * 15000) + 5000

  user.cookies = (user.cookies || 0) + recompensa
  user.lastCazar = now

  return m.reply(`🏹 ¡Has cazado un ${resultado}!\n💰 Recompensa: *${recompensa.toLocaleString()} monedas*`)
}

handler.command = ['cazar', 'hunt']
handler.tags = ['rpg']
handler.help = ['cazar']
export default handler