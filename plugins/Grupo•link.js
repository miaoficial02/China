var handler = async (m, { conn }) => {
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
  let texto = `
╭─❖ 💋 *LINK DEL GRUPO* 💋 ❖─⬣  
│🍑 *Aquí tienes, mi amor...*  
│📎 ${link}  
│💌 *Comparte con estilo, putito/a.*  
╰───────◇  
Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & David oficial Yt`.trim()
  
  conn.reply(m.chat, texto, m, { detectLink: true })
}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'gruplink', 'invitelink']

handler.group = true
handler.botAdmin = true

export default handler