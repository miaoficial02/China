//código creado x The Carlos 👑
//no olvides dejar créditos 

let handler = async (m, { conn, args }) => {
  const user = global.db.data.users[m.sender]
  const ratio = 1000 // Exp requerida por intercambio
  const monedasPorIntercambio = 5000
  const LIMITE_DIARIO = 3

  // Inicializar contador si no existe
  if (!user.expcambio) {
    user.expcambio = {
      hoy: 0,
      fecha: new Date().toDateString()
    }
  }

  // Reset diario automático
  if (user.expcambio.fecha !== new Date().toDateString()) {
    user.expcambio.hoy = 0
    user.expcambio.fecha = new Date().toDateString()
  }

  // Verificar si alcanzó el límite
  if (user.expcambio.hoy >= LIMITE_DIARIO) {
    return m.reply(`🚫 Has alcanzado el *límite de ${LIMITE_DIARIO} intercambios diarios*.\n📆 Intenta nuevamente mañana.`)
  }

  if (!args[0] || isNaN(args[0])) {
    return m.reply(`📌 Uso correcto: *.cambiarexp <cantidad de exp>*\n🎯 Ejemplo: *.cambiarexp 3000*`)
  }

  let cantidad = parseInt(args[0])
  if (cantidad <= 0) return m.reply('❌ La cantidad debe ser mayor a 0.')
  if (user.exp < cantidad) return m.reply(`❌ No tienes suficiente experiencia.\n📊 Exp actual: *${user.exp}*`)

  let veces = Math.floor(cantidad / ratio)
  if (veces === 0) return m.reply(`❌ Debes intercambiar al menos *${ratio}* de experiencia para recibir monedas.`)

  // Restringir el número de intercambios permitidos hoy
  if (user.expcambio.hoy + veces > LIMITE_DIARIO) {
    let disponibles = LIMITE_DIARIO - user.expcambio.hoy
    return m.reply(`⚠️ Solo puedes hacer *${disponibles}* intercambio(s) más hoy.\nUsaste: *${user.expcambio.hoy}/${LIMITE_DIARIO}*`)
  }

  let expUsada = veces * ratio
  let monedasGanadas = veces * monedasPorIntercambio

  user.exp -= expUsada
  user.cookies = (user.cookies || 0) + monedasGanadas
  user.expcambio.hoy += veces

  m.reply(`〔 *🔄 INTERCAMBIO REALIZADO* 〕
┃🧪 Exp usada: *${expUsada}*
┃🪙 Monedas obtenidas: *${monedasGanadas.toLocaleString()}*
┃📆 Intercambios usados hoy: *${user.expcambio.hoy}/${LIMITE_DIARIO}*
╰━━━━━━━━━━━━━━━━━━⬣`)
}

handler.help = ['cambiarexp <cantidad>']
handler.tags = ['rpg', 'econ']
handler.command = ['cambiarexp', 'expxmonedas']
handler.register = true
export default handler