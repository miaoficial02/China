// 🧠 Código mejorado por: 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & David Oficial ⚔️
// ⚠️ No borres créditos si no quieres que tu bot explote 💣

import fs from 'fs'
import path from 'path'

export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return

  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(/\s+/)[0].toLowerCase()

  const isValidCommand = (cmd, plugins) =>
    Object.values(global.plugins).some(p => {
      const cmds = p.command
      return cmds && (Array.isArray(cmds) ? cmds : [cmds]).includes(cmd)
    })

  if (isValidCommand(command, global.plugins)) {
    const user = global.db.data.users[m.sender] ||= {}
    user.commands = (user.commands || 0) + 1
    return
  }

  // 🎁 Easter eggs con recompensas
  const easterEggs = {
    'hacked': { recompensa: 100, mensaje: '🧨 Acceso secreto concedido... +100 XP.' },
    'glitch': { recompensa: 50, mensaje: '💫 Has glitcheado el sistema... +50 monedas.' },
    'neo': { recompensa: 77, mensaje: '🧠 Bienvenido, Elegido. +77 XP.' },
    'thematrix': { recompensa: 133, mensaje: '🔷 Realidad alterada. +133 monedas.' },
    'elcodigooculto': { recompensa: 250, mensaje: '🕵️‍♂️ ¡Código secreto desbloqueado! +250 XP.' }
  }

  if (easterEggs[command]) {
    const user = global.db.data.users[m.sender] ||= {}
    user.exp = (user.exp || 0) + easterEggs[command].recompensa
    await m.reply(easterEggs[command].mensaje)
    return
  }

  // 🛑 Errores con picante
  const errores = [
    `🛑 Comando inválido.`,
    `❎ Esa vaina no existe.`,
    `📵 ¿Qué intentas hacer con eso?`,
    `🔍 Ni Google encuentra eso.`,
    `⚠️ Ese código no está registrado.`,
    `🚷 No reconozco esa orden.`,
    `⛔ Error sintáctico detectado.`
  ]

  // 💢 Respuestas sarcásticas
  const insultos = [
    `📘 ¿Y si aprendes a leer, simio digital?`,
    `💀 ¿Eso era un intento de comando o un grito de auxilio?`,
    `🧯 Tu comando quemó medio servidor.`,
    `🎭 ¿Haciendo roleplay de hacker? Fracasaste.`,
    `📉 Tu IQ bajó con ese input.`,
    `📡 Señal perdida entre tanta estupidez.`,
    `🪫 Mi batería se drena cada vez que te leo.`,
    `💻 Eso no es un comando, es un atentado.`,
    `💬 Vuelve cuando aprendas a escribir.`,
    `🚫 Tu comando fue eliminado por razones de higiene.`
  ]

  const respuesta = Math.random() < 0.35
    ? insultos[Math.floor(Math.random() * insultos.length)]
    : `${errores[Math.floor(Math.random() * errores.length)]}\n\n🧩 *${usedPrefix}${command}*\n📖 Usa *${usedPrefix}menu* para ver los comandos válidos.`

  await m.reply(respuesta.trim())

  // 📝 Log del intento de comando inválido
  try {
    const logDir = './logs'
    const logFile = path.join(logDir, 'comandos_invalidos.log')
    const chatName = m.isGroup ? (await conn.getName(m.chat)) : 'Privado'
    const userName = await conn.getName(m.sender)
    const logEntry = `[${new Date().toISOString()}] ❌ ${command} | ${userName} | ${chatName} (${m.chat})\n`

    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
    fs.appendFileSync(logFile, logEntry)
  } catch (e) {
    console.error('\x1b[31m[AntiCmd] ❗ Error al guardar log:\x1b[0m', e)
  }
}