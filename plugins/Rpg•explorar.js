const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  user.personajes = user.personajes || []

  const dimensiones = ['Dimensión de Hielo', 'Bosque Prohibido', 'Reino de Sombra', 'Cráter de Lava', 'Caverna de Ilusión', 'Templo Abandonado', 'Ruinas del Tiempo', 'Abismo Cuántico']
  const eventos = ['enemigo', 'personaje', 'monedas', 'nada', 'trampa', 'item']
  const dimension = dimensiones[Math.floor(Math.random() * dimensiones.length)]
  const evento = eventos[Math.floor(Math.random() * eventos.length)]

  let respuesta = `🌌 *${dimension}*\n\n`

  switch (evento) {
    case 'enemigo':
      respuesta += '👁 Un ente maldito intentó devorarte...\n'
      const suerte = Math.random()
      if (suerte < 0.5) {
        respuesta += '💀 ¡Perdiste 15,000 monedas!\n'
        user.money = Math.max(0, (user.money || 0) - 15000)
      } else {
        respuesta += '🛡 Lograste escapar sin daños.'
      }
      break

    case 'personaje':
      const posibles = [...(global.personajesNormales || [])]
      const nuevo = posibles[Math.floor(Math.random() * posibles.length)]
      if (nuevo) {
        respuesta += `🎁 ¡Encontraste un personaje oculto! → *${nuevo.nombre}*\n`
        if (!user.personajes.includes(nuevo.nombre.toLowerCase())) {
          user.personajes.push(nuevo.nombre.toLowerCase())
          respuesta += '🧩 Añadido a tu colección.'
        } else {
          respuesta += '📦 Ya lo tenías, recibiste 10,000 monedas.'
          user.money = (user.money || 0) + 10000
        }
      } else {
        respuesta += '📛 No se pudo generar personaje.'
      }
      break

    case 'monedas':
      const ganancia = Math.floor(Math.random() * 25000) + 5000
      user.money = (user.money || 0) + ganancia
      respuesta += `💰 Has encontrado *${ganancia.toLocaleString()} monedas* escondidas.`
      break

    case 'item':
      user.fragmentos = (user.fragmentos || 0) + 1
      respuesta += '🔮 Encontraste un *Fragmento de Magia Prohibida* escondido entre ruinas.'
      break

    case 'trampa':
      respuesta += '☠️ Caíste en una trampa mágica...\n'
      if (user.personajes.length > 0) {
        const quitado = user.personajes.splice(Math.floor(Math.random() * user.personajes.length), 1)[0]
        respuesta += `😢 Perdiste a *${quitado}* de tu colección.`
      } else {
        respuesta += '🌀 Pero no tenías personajes para perder.'
      }
      break

    case 'nada':
    default:
      respuesta += '🌫 Nada ocurrió... pero sentiste una presencia oscura.'
      break
  }

  conn.reply(m.chat, respuesta, m)
}

handler.help = ['explorar']
handler.tags = ['rpg']
handler.command = ['explorar']
handler.register = true
export default handler