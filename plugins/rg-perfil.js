//✨ Código personalizado y maldito por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲

import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

const imagen1 = 'https://cloudkuimages.com/uploads/images/MJ4ARGK6.jpg'

var handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1)
  let user = global.db.data.users[m.sender]

  if (!user) {
    user = global.db.data.users[m.sender] = {
      premium: false,
      level: 0,
      cookies: 0,
      exp: 0,
      lastclaim: 0,
      registered: false,
      regTime: -1,
      age: 0,
      role: '⭑ Novato ⭑'
    }
  }

  let { premium, level, exp, registered, role } = user
  let username = await conn.getName(who)

  let animacion = `
┏━━━━━━━━━━━━━━━┓
┃ 🔮 *GRIMORIO MAGICO* 🔮
┗━━━━━━━━━━━━━━━┛

⏳ Analizando tu alma mágica...
📖 Leyendo grimorio oculto...
⚡ Sincronizando con tu maná interno...

✨✨✨ 𝘼𝘾𝙏𝙄𝙑𝘼𝘾𝙄𝙊́𝙉 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼 ✨✨✨

*¡Tu grimorio se ha manifestado, desgraciado...!* 😈
`.trim()

  await m.reply(animacion)

  let noprem = `
🔰 *GRIMORIO INCOMPLETO* 🔰

⚔️ *Portador:* ${username}
🆔 *ID:* @${who.replace(/@.+/, '')}
📌 *Registrado:* ${registered ? '✅ Activado' : '❌ No'}

⚡ *Nivel:* ${level}
📈 *Rango:* ${role}
✨ *Experiencia:* ${exp}
💠 *Premium:* ❌ No activo

📕 *Grimorio:* Básico de 1 hoja
🔒 *Elemento:* Aún sin despertar

🥀 Eres un simple muggle más... Despierta tu magia para ascender.
`.trim()

  let prem = `
👹 *𝐌𝐎𝐃𝐎 𝐃𝐄𝐌𝐎𝐍𝐈𝐎: 𝐎𝐍* 👹

⚡ *GRIMORIO DEFINITIVO*

🧛 *Portador Maldito:* ${username}
🧿 *ID:* @${who.replace(/@.+/, '')}
📌 *Registrado:* ${registered ? '✅ Activado' : '❌ No'}

🌟 *Nivel:* ${level}
📈 *Rango:* ${role}
✨ *Experiencia:* ${exp}
💠 *Premium:* ✅ ACTIVADO

📓 *Grimorio:* ☯️ Anti-Magia 5 hojas
🧩 *Elemento:* Espada Demoníaca

🪄 *Hechizo Especial:* 
『𝙱𝚕𝚊𝚌𝚔 the Legends ⚔️』

☠️ Has roto tus límites... Ahora eres una amenaza.

━─━────༺༻────━─━

👑 Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
`.trim()

  await conn.sendFile(m.chat, pp, 'grimorio.jpg', premium ? prem : noprem, m, undefined, {
    mentions: [who]
  })
}

handler.help = ['profile', 'perfil']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler