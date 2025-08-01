const cooldown = 12 * 60 * 60 * 1000 // 12 horas

var handler = async (m, { conn, isPrems }) => {
  const user = global.db.data.users[m.sender]
  const now = new Date() * 1

  if (user.lastclaim && now - user.lastclaim < cooldown) {
    const timeLeft = msToTime(cooldown - (now - user.lastclaim))
    return conn.reply(m.chat, `⏳ *Sistema de recompensas bloqueado*\n\n🧬 Vuelve en: *${timeLeft}*`, m)
  }

  const coin = pickRandom([5, 10, 15, 20, 30, 50, 100, 200, 500])
  const exp = isPrems
    ? pickRandom([1000, 1500, 2000, 2500, 3000])
    : pickRandom([500, 700, 900, 1100, 1300])

  const diamonds = pickRandom([1, 2, 3, 4, 5])

  user.money += coin
  user.exp += exp
  user.diamond += diamonds
  user.lastclaim = now

  return conn.reply(m.chat, `
╔══🎁═[ 𝗥𝗘𝗖𝗢𝗠𝗣𝗘𝗡𝗦𝗔 𝗗𝗜𝗔𝗥𝗜𝗔 ]══╗
┃ 🧬 Recompensa generada por el sistema.
┃ ⚡ Usuario: *@${m.sender.split("@")[0]}*
┃ 🧠 Premium: *${isPrems ? '✅' : '❌'}*
╠═══════════════════════
┃ ✨ XP: *+${exp}*
┃ 💰 Monedas: *+${coin}*
┃ 💎 Diamantes: *+${diamonds}*
╚═══════════════════════╝

🕐 Reintenta en 12 horas.
`, m, { mentions: [m.sender] })
}

handler.help = ['daily', 'claim']
handler.tags = ['rpg']
handler.command = ['daily', 'claim']
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
  const hours = Math.floor(duration / 3600000)
  const minutes = Math.floor((duration % 3600000) / 60000)
  const seconds = Math.floor((duration % 60000) / 1000)
  return `${hours}h ${minutes}m ${seconds}s`
}