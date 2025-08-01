import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'

const handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, '🍑 Responde a un *sticker* para convertirlo en video, bebecito(a) 💋', m)
  }

  const mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) {
    return conn.reply(m.chat, '🍑 Eso no es un *sticker*, amor. Responde a uno válido, ¿sí? 🙄', m)
  }

  const media = await m.quoted.download()
  let out = Buffer.alloc(0)

  conn.reply(m.chat, '💦 Espera amor... lo estoy convirtiendo en algo delicioso para ti 🎥✨', m)

  if (/webp/.test(mime)) {
    out = await webp2mp4(media)
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(media, [
      '-filter_complex', 'color',
      '-pix_fmt', 'yuv420p',
      '-crf', '51',
      '-c:a', 'copy',
      '-shortest',
    ], 'mp3', 'mp4')
  }

  await conn.sendFile(m.chat, out, 'sexyvideo.mp4', '🎬 Aquí tienes tu *video ricolino* 💦💕\n\n_Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 y David Oficial_\n💌 Con cariño desde 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 😈', m, 0, { thumbnail: out })
}

handler.help = ['tovideo']
handler.tags = ['transformador']
handler.group = true
handler.register = true
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif']

export default handler