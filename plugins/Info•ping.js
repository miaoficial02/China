import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp

  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let info = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

    let msg = `
╭───💻 *ESTADO DEL SISTEMA* ───⬣
│
├ 🏓 *Velocidad:* ${latensi.toFixed(4)} ms
├ 🤖 *Sistema:*
│
${info.trim()}
│
╰── *VLADILENA 𝘽𝙤𝙩 Online* ✅
`.trim()

    conn.reply(m.chat, msg, m, rcanal)
  })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler