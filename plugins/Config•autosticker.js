import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn }) => {
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]

  if (!chat?.autosticker || !m.isGroup) return !0

  let q = m
  let stiker = false
  let mime = (q.msg || q).mimetype || q.mediaType || ''

  if (/webp/g.test(mime)) return !0 // Ya es sticker, ni mames 😏

  if (/image/g.test(mime)) {
    let img = await q.download?.()
    if (!img) return !0
    stiker = await sticker(img, false, packname, author)
  } else if (/video/g.test(mime)) {
    if ((q.msg || q).seconds > 8)
      return await m.reply('🚩 Oye perra, el video no puede durar más de 7 segundos, inténtalo de nuevo 😤')

    let vid = await q.download()
    if (!vid) return !0
    stiker = await sticker(vid, false, packname, author)
  } else if (m.text) {
    let url = m.text.split(/\n| /i)[0]
    if (isUrl(url)) stiker = await sticker(false, url, packname, author)
    else return !0
  }

  if (stiker) {
    await conn.sendFile(
      m.chat,
      stiker,
      'sticker.webp',
      '',
      m,
      true,
      {
        contextInfo: {
          forwardingScore: 200,
          isForwarded: false,
          externalAdReply: {
            showAdAttribution: false,
            title: packname,
            body: author,
            mediaType: 2,
            thumbnail: icons,
            sourceUrl: redes,
          },
        },
      },
      { quoted: m }
    )
    await m.reply(
      '✨ Sticker hecho con amor por 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 💅\n\n' +
        '🛠️ Creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 y David Oficial'
    )
  }

  return !0
}

export default handler

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/,
      'gi'
    )
  )
}