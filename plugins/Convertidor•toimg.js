// 🖼️ Conversor de Sticker a Imagen – VLADILENA Bot 🦋
// 🌟 Creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 y David Oficial 🌟

import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  const mensajeError = '🌸 *Tontito/a*, responde a un sticker para convertirlo en imagen 💋'
  const q = m.quoted || m
  const mime = q.mediaType || ''
  
  if (!/sticker/.test(mime)) return m.reply(mensajeError)

  const media = await q.download()
  let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)

  await conn.sendFile(m.chat, out, 'sticker_convertido.png', '✨ Aquí tienes tu imagen, bebé 💖', m)
}

handler.help = ['toimg (responde sticker)']
handler.tags = ['sticker']
handler.command = ['toimg', 'img', 'jpg']

export default handler