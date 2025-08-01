let handler = async (m, { conn, text }) => {
  let who

  if (m.isGroup) {
    if (m.mentionedJid.length > 0) {
      who = m.mentionedJid[0]
    } else if (m.quoted) {
      who = m.quoted.sender
    } else {
      return m.reply('❗ Menciona a un usuario o responde a su mensaje.')
    }
  } else {
    who = m.chat
  }

  if (!text) return m.reply('📥 Ingresa la cantidad de *monedas 🪙* a añadir.\nEjemplo: *.añadirmonedas @user 50000* o *.añadirmonedas @user infinito*')
  
  let cantidadTexto = text.replace('@' + who.split`@`[0], '').trim().toLowerCase()

  // Si es infinito
  if (['infinito', '∞'].includes(cantidadTexto)) {
    global.db.data.users[who].cookies = 999999999
    return await conn.reply(m.chat, `
╭━━〔 *💸 TESORO ILIMITADO* 〕━━⬣  
┃🎖️ Usuario: @${who.split('@')[0]}
┃💰 Monedas asignadas: *999,999,999 🪙*
┃🛡️ Modo: *Infinito Activado*
╰━━━━━━━━━━━━━━━━━━━━⬣`, m, { mentions: [who] })
  }

  // Validación normal
  if (isNaN(cantidadTexto)) return m.reply('⚠️ Solo se permiten números o la palabra *infinito*.')
  let cantidad = parseInt(cantidadTexto)
  if (cantidad < 1) return m.reply('❌ La cantidad mínima es 1.')

  if (!global.db.data.users[who]) global.db.data.users[who] = {}
  global.db.data.users[who].cookies = (global.db.data.users[who].cookies || 0) + cantidad

  await conn.reply(m.chat, `
╭━━〔 *🪙 MONEDAS ENTREGADAS* 〕━━⬣  
┃👤 Usuario: @${who.split('@')[0]}
┃💰 Monedas añadidas: *${cantidad.toLocaleString()} 🪙*
┃💼 Total actual: *${global.db.data.users[who].cookies.toLocaleString()} 🪙*
╰━━━━━━━━━━━━━━━━━━━━⬣`, m, { mentions: [who] })
}

handler.help = ['añadirmonedas @usuario cantidad']
handler.tags = ['owner']
handler.command = ['añadirmonedas', 'addmonedas', 'addmoney']
handler.rowner = true

export default handler