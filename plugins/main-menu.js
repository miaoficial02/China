import { xpRange } from '../lib/levelling.js'

const textVladilena = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
  }
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  'main': textVladilena('Sistema'),
  'group': textVladilena('Grupos'),
  'serbot': textVladilena('Sub Bots'),
  // puedes agregar más categorías aquí si quieres
}

const defaultMenu = {
  before: `⚔️ 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 - 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 𝗔𝗖𝗧𝗜𝗩𝗢 ⚔️
┏━━━❰ 𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 ❱━━━┓
┃ 🆔 Usuario: %name
┃ 📊 Nivel: %level
┃ ⚡ EXP: %exp / %maxexp
┃ 👥 Usuarios totales: %totalreg
┃ ⏱️ Tiempo online: %muptime
┗━━━━━━━━━━━━━━━━━━━━━━┛

👑 Operador: David Oficial  
─────────────────────────────
❗ Elige un comando y domina el reino.
`.trimStart(),

  header: '\n╭───〔 🔥 %category 〕───╮',
  body: '│ ⚙️ %cmd\n',
  footer: '╰──────────────────────╯',
  after: `\n⚡ 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 𝗠𝗶𝘀𝗶𝗼́𝗻 𝗖𝘂𝗺𝗽𝗹𝗶𝗱𝗮 ⚡
🛡️ ¡A romperla y a controlar el caos!`
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`
    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"] ? "Privado" : "Público"

    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled: !p.disabled,
    }))

    for (let plugin of help) {
      if (plugin.tags) {
        for (let t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textVladilena(t)
        }
      }
    }

    const { before, header, body, footer, after } = defaultMenu

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        const cmds = help
          .filter(menu => menu.tags.includes(tag))
          .map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix ? cmd : _p + cmd)).join('\n'))
          .join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
      }),
      after
    ].join('\n')

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
    }

    let text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    await conn.sendMessage(m.chat, {
      text,
      mentions: [m.sender]
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error al generar el menú estilo VLADILENA Bot.', m)
  }
}

handler.help = ['menu', 'menú', 'help', 'ayuda']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true

export default handler

function clockString(ms) {
  if (isNaN(ms)) return '--:--:--'
  let h = Math.floor(ms / 3600000)
  let m = Math.floor((ms % 3600000) / 60000)
  let s = Math.floor((ms % 60000) / 1000)
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}