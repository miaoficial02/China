import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) {
        if ((q.msg || q).seconds > 8) return m.reply('🚫 *El video no puede durar más de 8 segundos, tontito.*')
      }

      let img = await q.download?.()
      if (!img) return conn.reply(m.chat, '👻 *No encontré ninguna imagen o video, envíamelo bien, baboso.*', m)

      try {
        stiker = await sticker(img, false, global.packsticker, global.author)
      } catch (e) {
        console.error(e)
        if (/webp/g.test(mime)) out = await webp2png(img)
        else if (/image/g.test(mime)) out = await uploadImage(img)
        else if (/video/g.test(mime)) out = await uploadFile(img)
        if (typeof out !== 'string') out = await uploadImage(img)
        stiker = await sticker(false, out, global.packsticker, global.author)
      }

    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.author)
      } else {
        return m.reply('😒 *¿Y ese link pedorro qué? Mándame uno bien, perra.*')
      }
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            showAdAttribution: false,
            title: `👑 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩`,
            body: '🔥 Stickers hechizos by la reina',
            mediaType: 2,
            sourceUrl: redes,
            thumbnail: icons
          }
        }
      })
    } else {
      return conn.reply(m.chat, '💔 *No pude convertir eso a sticker, mándame una imagen, gif o video (máx 8s).*', m)
    }
  }
}

handler.help = ['sticker <imagen|url>']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.register = true

export default handler

const isUrl = (text) => {
  return text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/gi)
}