async function handler(m, { conn: stars }) {
  let uniqueUsers = new Map()

  global.conns.forEach(conn => {
    if (conn.user && conn.ws && conn.ws.socket && conn.ws.socket.readyState === 1) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  let users = [...uniqueUsers.values()]
  let totalUsers = users.length
  global.totalUsers = totalUsers

  let packname = global.packname || '💀 VLADILENA BOT 💀'
  let title = `🔥 SUB-BOTS ACTIVOS 🔥`
  let divider = '──────────────────────────'

  let listado = users.map((v, i) => {
    let jid = v.user.jid.replace(/[^0-9]/g, '')
    let nombre = v.user.name || '👤 SUB-BOT'
    return `╔═══【 #${i + 1} 】═══╗
👹 @${jid}
🌍 https://wa.me/${jid}
🧠 Nombre: ${nombre}
╚═════════════════╝`
  }).join('\n\n')

  let responseMessage = `⚔️ 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 ⚔️

${title}
${divider}

${listado || '❌ No hay sub-bots activos. Esto está muerto.'}

🚀 ¡Activa tu grimorio y únete a la guerra!`

  const imageUrl = 'https://files.cloudkuimages.guru/images/VM5QylKJ.jpg'

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        displayName: "Subbot",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Subbot;;;\nFN:Subbot\nEND:VCARD"
      }
    }
  }

  await stars.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption: responseMessage,
    mentions: stars.parseMention(responseMessage)
  }, { quoted: fkontak })
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['jadibot']
export default handler