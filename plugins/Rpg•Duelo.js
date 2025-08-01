const handler = async (m, { conn, args }) => {
  const [target] = m.mentionedJid || []
  if (!target) return m.reply('❌ Menciona al usuario que deseas retar: *.duelo @usuario <apuesta> [tuPersonaje] [personajeRival]*')

  const u1 = global.db.data.users[m.sender]
  const u2 = global.db.data.users[target]

  if (!u1.personajes || u1.personajes.length === 0)
    return m.reply('⚠️ Tú no tienes personajes para duelar.')

  if (!u2.personajes || u2.personajes.length === 0)
    return m.reply('⚠️ El usuario mencionado no tiene personajes para duelar.')

  // Validar apuesta
  let apuesta = parseInt(args[1])
  if (!apuesta || apuesta <= 0) return m.reply('❌ Debes poner una cantidad válida para apostar.')
  if ((u1.cookies || 0) < apuesta) return m.reply('❌ No tienes suficientes monedas para esa apuesta.')
  if ((u2.cookies || 0) < apuesta) return m.reply('❌ El rival no tiene suficientes monedas para esa apuesta.')

  // Obtener personajes seleccionados (opcional)
  let pj1Name = args[2] ? args.slice(2, 3).join(' ').toLowerCase() : null
  let pj2Name = args[3] ? args.slice(3).join(' ').toLowerCase() : null

  const buscarPersonajeUsuario = (user, nombre) => {
    if (!nombre) return user.personajes[Math.floor(Math.random() * user.personajes.length)]
    const encontrado = user.personajes.find(p => p.toLowerCase() === nombre)
    return encontrado || null
  }

  const pj1 = buscarPersonajeUsuario(u1, pj1Name)
  if (!pj1) return m.reply('❌ No tienes ese personaje o escribiste mal su nombre.')

  const pj2 = buscarPersonajeUsuario(u2, pj2Name)
  if (!pj2) return m.reply('❌ El usuario no tiene ese personaje o escribiste mal su nombre.')

  // Obtener datos del personaje y habilidades
  const obtenerDatosPj = (nombre) => {
    const lista = [...(global.personajesTop || []), ...(global.personajesComunes || [])]
    const pj = lista.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    const rareza = global.personajesTop?.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())
      ? '👑 TOP'
      : pj?.precio >= 80000 ? '💎 Elite' : pj?.precio >= 60000 ? '⚔️ Medio' : '🌱 Básico'
    return { pj, rareza, precio: pj?.precio || 100000 }
  }

  const datos1 = obtenerDatosPj(pj1)
  const datos2 = obtenerDatosPj(pj2)

  // Funciones para aplicar efectos de habilidades
  function aplicarHabilidad(datos, fuerzaBase) {
    const habilidad = datos.pj?.habilidad || ''

    let fuerza = fuerzaBase

    // Ejemplos de efectos
    if (habilidad.includes('resurrección')) fuerza += 15000 // boost fuerte
    if (habilidad.includes('hacker')) fuerza += 7000
    if (habilidad.includes('tiempo')) fuerza += 12000
    if (habilidad.includes('fuego')) fuerza += 8000
    if (habilidad.includes('sombra')) fuerza += 9000
    if (habilidad.includes('berserker')) fuerza += 11000
    if (habilidad.includes('magia del caos')) fuerza += 13000
    if (habilidad.includes('destruye mundos')) fuerza += 14000
    if (habilidad.includes('intangibilidad')) fuerza += 6000

    // Bonus aleatorio pequeño (±5000)
    fuerza += Math.floor(Math.random() * 10000) - 5000

    return fuerza
  }

  let fuerza1 = aplicarHabilidad(datos1, datos1.precio)
  let fuerza2 = aplicarHabilidad(datos2, datos2.precio)

  // Calcular ganador
  const gana1 = fuerza1 >= fuerza2
  const ganador = gana1 ? m.sender : target
  const perdedor = gana1 ? target : m.sender

  // Ajustar monedas (apuesta)
  global.db.data.users[ganador].cookies = (global.db.data.users[ganador].cookies || 0) + apuesta
  global.db.data.users[perdedor].cookies = (global.db.data.users[perdedor].cookies || 0) - apuesta

  // Frases humillantes
  const frases = [
    "¿Eso fue todo? Pensé que ibas a dar pelea.",
    "Aprende a pelear antes de desafiarme.",
    "¿De verdad creíste que tenías oportunidad?",
    "Vuelve cuando tengas personajes decentes.",
    "Eres un chiste en este duelo.",
    "¿Quieres revancha o mejor te retiras?",
    "No fue un duelo, fue un paseo para mí.",
    "Me cansé de esperar que hicieras algo.",
    "¿Así que ese es tu mejor personaje? Patético.",
    "Mi abuela pelea mejor que tú.",
    "Sal de aquí antes de que te humille otra vez.",
    "Hasta un principiante gana más que tú.",
    "¡Más entrenamiento y menos charla!",
    "¿Ese es tu mejor intento? Qué triste.",
    "Ni en sueños me ganas.",
    "Tu derrota fue tan rápida que ni la vi.",
    "Sigue soñando que puedes ganarme.",
    "Eres el hazmerreír del reino.",
    "No traigas a tus personajes débiles aquí.",
    "Regresa cuando tengas algo digno de mi atención.",
    "No te preocupes, no todos pueden ser ganadores.",
    "¿Crees que me impresionas? Ja.",
    "Vaya, una derrota más para tu récord.",
    "¿En serio te divertiste perdiendo?",
    "Me aburro peleando contigo.",
    "¿Dónde está tu espíritu de lucha? Se perdió.",
    "Podría vencerte con los ojos cerrados.",
    "Hazte un favor y no vuelvas.",
    "Me das pena, pero te respeto por intentarlo.",
    "Este duelo fue un paseo dominical para mí."
  ]
  const fraseHumillante = frases[Math.floor(Math.random() * frases.length)]

  const texto = `
⚔️ *Duelo de personajes*

🎭 ${await conn.getName(m.sender)} usó: *${datos1.pj?.nombre || pj1}* (${datos1.rareza})  
🎭 ${await conn.getName(target)} usó: *${datos2.pj?.nombre || pj2}* (${datos2.rareza})

🏆 Ganador: *${await conn.getName(ganador)}*  
💸 Premio: *${apuesta.toLocaleString()} monedas*

💀 Perdedor: *${await conn.getName(perdedor)}*  
💸 Monedas perdidas: *${apuesta.toLocaleString()} monedas*

🗣️ *${await conn.getName(ganador)} dice:* "${fraseHumillante}"
`

  await conn.reply(m.chat, texto.trim(), m, { mentions: [m.sender, target] })
}

handler.help = ['duelo @usuario <apuesta> [tuPersonaje] [personajeRival]']
handler.tags = ['rpg']
handler.command = ['duelo']
handler.register = true
export default handler