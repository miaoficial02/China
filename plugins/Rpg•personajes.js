const handler = async (m, { conn, args, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender]
  const nombre = args.join(' ').toLowerCase()

  if (!nombre) {
    return conn.reply(m.chat, `❗ Usa: *${usedPrefix + command} <nombre del personaje>*\nEjemplo: *.comprar Goku*`, m)
  }

  if (!user.personajes) user.personajes = []
  if (typeof user.cookies !== 'number') user.cookies = 0

  const todos = [...global.personajesTop, ...global.personajesComunes]
  const pj = todos.find(p => p.nombre.toLowerCase() === nombre)

  if (!pj) {
    return conn.reply(m.chat, `❌ No encontré ese personaje.\nUsa *.listarpersonajes* para ver los disponibles.`, m)
  }

  if (user.personajes.includes(pj.nombre.toLowerCase())) {
    return conn.reply(m.chat, `✅ Ya tienes a *${pj.nombre}* en tu colección.`, m)
  }

  if (user.cookies < pj.precio) {
    return conn.reply(m.chat, `💸 No tienes suficientes monedas.\n💰 Necesitas *${pj.precio.toLocaleString()}* monedas, pero solo tienes *${user.cookies.toLocaleString()}*`, m)
  }

  user.cookies -= pj.precio
  user.personajes.push(pj.nombre.toLowerCase())

  const mensaje = `
╭══ 🎉 *COMPRA EXITOSA* 🎉 ═⬣
│ 👤 Personaje: *${pj.nombre}*
│ 💰 Precio: *${pj.precio.toLocaleString()} monedas*
│ 🧠 Habilidad: ${pj.habilidad || 'Desconocida'}
│ 
│ 📦 Añadido a tu colección
│ 💸 Monedas restantes: *${user.cookies.toLocaleString()}*
╰═══⧼ 🛡️ 𝕆𝔹𝕋𝔼ℕ𝕀𝔻𝔸 🧬 ⧽═══⬣
`.trim()

  await conn.reply(m.chat, mensaje, m)
}

handler.help = ['comprar <personaje>']
handler.tags = ['rpg', 'economia']
handler.command = ['comprar']
handler.register = true
export default handler