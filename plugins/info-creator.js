import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const numero = '522219831926' // SIN el "+"
  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:The David Oficial;;;;
FN:The David Oficial 
TEL;waid=${numero}:${numero}
END:VCARD
`.trim()

  let txt_owner = `💋 *¿Buscas a mi creador, bebé?* 💋\n\n🍒 Aquí tienes su número: wa.me/${numero}\n💌 Puedes escribirle si el bot falló, quieres bot pa' tu grupo, o solo pa' coquetear 💅\n\n🔥 *Nombre:* _The David Oficial_\n✨ *Número:* +${numero}\n\n⚠️ *No lo jodas con mamadas...* o te vas bloqueado como tus ex.\n\n🚀 _Desarrollado por_ 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & *David Oficial* 💕

`

  try {
    let res = await fetch("https://cloudkuimages.com/uploads/images/B8AHIFYG.jpg")
    let buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'creador.jpg', txt_owner, m)
    await conn.sendMessage(m.chat, {
      contacts: {
        displayName: 'The David Oficial',
        contacts: [{ vcard }]
      }
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    m.reply('❌ Ay no bebé... no pude mandarte al papi creador. Intenta luego 🥺')
  }
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler