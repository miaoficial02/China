function precioAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Asegúrate que global.personajesTop y global.personajesComunes existan (como en tus códigos anteriores)

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]

  if (!user.fragmentos || user.fragmentos < 1) {
    return conn.reply(m.chat, '❌ No tienes fragmentos oscuros suficientes para invocar. Necesitas al menos 1.', m)
  }

  if (!user.personajes) user.personajes = []

  // Consumir un fragmento oscuro por invocación
  user.fragmentos -= 1
  user.invocaciones = (user.invocaciones || 0) + 1

  // Probabilidad de invocar personaje épico (15%)
  const esEpico = Math.random() < 0.15

  let personajeInvocado

  if (esEpico) {
    personajeInvocado = global.personajesTop[Math.floor(Math.random() * global.personajesTop.length)]
  } else {
    personajeInvocado = global.personajesComunes[Math.floor(Math.random() * global.personajesComunes.length)]
  }

  // Agregar personaje invocado (solo si no lo tiene)
  if (!user.personajes.includes(personajeInvocado.nombre.toLowerCase())) {
    user.personajes.push(personajeInvocado.nombre.toLowerCase())
  }

  const texto = `
✨ *Invocación mágica*

Has usado 1 fragmento oscuro.
🎭 Personaje invocado: *${personajeInvocado.nombre}* ${esEpico ? '👑 (ÉPICO)' : ''}
🧠 Habilidad: ${personajeInvocado.habilidad || 'Desconocida'}

📦 ${user.personajes.includes(personajeInvocado.nombre.toLowerCase()) ? 'Ya lo tenías en tu colección.' : 'Añadido a tu colección.'}
  
💠 Fragmentos restantes: *${user.fragmentos}*
`.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['invocar', 'invocacion']
handler.tags = ['rpg']
handler.command = ['invocar', 'invocacion']
handler.register = true
export default handler