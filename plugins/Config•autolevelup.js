import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import moment from 'moment-timezone'

export function before(m, { conn }) {
  let user = global.db.data.users[m.sender]
  let chat = global.db.data.chats[m.chat]

  if (!chat.autolevelup) return !0

  let antes = user.level * 1
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

  if (antes !== user.level) {
    m.reply(`╭━〔 *💋 𝐍𝐈𝐕𝐄𝐋 𝐒𝐔𝐁𝐈𝐃𝐎 𝐌𝐈 𝐕𝐈𝐃𝐀 💋* 〕━⬣
┃✨ *Nivel Actual:* ${user.level}
┃🔞 *Rango:* ${user.role}
┃📅 *Fecha:* ${moment.tz('America/Bogota').format('DD/MM/YY')}
┃🎀 *User:* @${m.sender.split('@')[0]}
╰━━━━━━⊰ 💕 ⊱━━━━━━⬣

🌟 _Ay, mi ciela... ¡te me pusiste bien sabroso subiendo de nivel!_
🥵 _Sigue así y te daré premios más ricos..._
*— 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 💦*`, null, { mentions: [m.sender] })
  }
}