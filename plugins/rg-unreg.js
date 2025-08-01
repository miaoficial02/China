let handler = async function (m, { conn }) {
  let user = global.db.data.users[m.sender]

  if (!user.registered) {
    return m.reply(`
🚫 *NO ESTÁS REGISTRAD@, BBSITA...*
╭━━•💔•━━╮
┃ No puedo eliminar lo que no existe...
┃ Regístrate primero con *.reg nombre.edad*
╰━━•💔•━━╯
    `.trim())
  }

  user.registered = false
  user.name = ''
  user.age = 0
  user.gender = ''
  user.country = ''
  user.afinidad = ''
  user.nivelMagico = 0
  user.regTime = 0

  m.reply(`
⚰️ *REGISTRO ELIMINADO CON ÉXITO...*
╭━━•🗡️•━━╮
┃ Tu existencia fue borrada del grimorio... 
┃ Pero puedes renacer con *.reg nombre.edad*
╰━━•🗡️•━━╯
    `.trim())
}

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler