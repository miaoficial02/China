let handler = async (m, { conn }) => {
  let Reglas = `
╔══════════════════════╗
║      ⚠️ REGLAS DEL BOT ⚠️
╠══════════════════════╣
║ ┌─❗ *NO LLAMAR AL BOT*
║ ├─❗ *NO HACER SPAM AL BOT*
║ ├─❗ *CONTACTAR AL OWNER SOLO SI ES IMPORTANTE*
║ ├─❗ *NO ESCRIBIR AL PRIVADO DEL BOT*
║ ├─❗ *RESPETA LOS TÉRMINOS Y CONDICIONES*
║ ├─❗ *USA EL BOT DE MANERA APROPIADA*
║ └─❗ *NO INSULTAR AL BOT*
╠══════════════════════╣
║ 📔 *INFO:* Si rompes las reglas, podrías ser baneado y bloqueado.
║ 📝 *NOTA:* Este es el bot oficial *𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 (OFC)*.
║ Usa *.owner* para verificar el staff oficial.
╠══════════════════════╣
║gracias por estar aquí 
╚══════════════════════╝
`.trim()

  const imagen = imagen2 || 'https://cloudkuimages.com/uploads/images/B8AHIFYG.jpg'
  await conn.sendFile(m.chat, imagen, 'reglas.jpg', Reglas, m)
}

handler.help = ['reglas']
handler.tags = ['info']
handler.customPrefix = /^(reglas|reglasbot|uso|usobot|uso del bot|botreglas)$/i
handler.command = new RegExp // si usas customPrefix, no hace falta
handler.register = true
handler.exp = 70

export default handler