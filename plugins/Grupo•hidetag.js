import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import * as fs from 'fs'

var handler = async (m, { conn, text, participants }) => {

  if (!m.quoted && !text) {
    return conn.reply(m.chat, `👀 *Y el texto, baboso?*\n\nEtiqueta algo o escribe lo que quieras enviar con *hidetag* 💅🏼`, m)
  }

  try {
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m
    let c = m.quoted ? await m.getQuotedObj() : m.msg
    let msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(m.chat, {
        [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }
      }, { quoted: null, userJid: conn.user.id }),
      text || q.text,
      conn.user.jid,
      { mentions: users }
    )
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    
  } catch (e) {
    let users = participants.map(u => conn.decodeJid(u.id))
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    let isMedia = /image|video|sticker|audio/.test(mime)
    let htextos = text ? text : "*¿Y ahora qué?* 😒"

    if (isMedia && quoted.mtype === 'imageMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { image: mediax, caption: htextos, mentions: users }, { quoted: null })
    } else if (isMedia && quoted.mtype === 'videoMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { video: mediax, mimetype: 'video/mp4', caption: htextos, mentions: users }, { quoted: null })
    } else if (isMedia && quoted.mtype === 'audioMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { audio: mediax, mimetype: 'audio/mp4', fileName: `HinataHidetag.mp3`, mentions: users }, { quoted: null })
    } else if (isMedia && quoted.mtype === 'stickerMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: null })
    } else {
      const invisible = String.fromCharCode(8206).repeat(850)
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${invisible}\n📢 *Mensaje Coqueto:*\n${htextos}`,
          contextInfo: {
            mentionedJid: users,
            externalAdReply: {
              title: '🔥 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 Notificación 🔥',
              body: 'Coqueta pero directa 😏',
              thumbnailUrl: 'https://files.cloudkuimages.guru/images/KFNXZuEv.jpg',
              sourceUrl: 'https://wa.me/522219831926'
            }
          }
        }
      }, {})
    }
  }
}

handler.help = ['hidetag']
handler.tags = ['grupo']
handler.command = ['hidetag', 'notificar', 'notify']

handler.group = true
handler.admin = true
handler.register = true

export default handler