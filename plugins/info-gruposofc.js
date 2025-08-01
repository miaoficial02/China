import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://whatsapp.com/channel/0029VbBDvKDL7UVS1oMqgu35' // tu link real

  const namechannel = 'Canal del Bot'
  const channel = 'https://chat.whatsapp.com/KqPIhaVSwKr9QsD6SnmFyH' // tu canal real

  const dev = '👾 Desarrollador: David Oficial'
  const catalogo = 'https://cloudkuimages.com/uploads/images/B8AHIFYG.jpg' 
  const emojiReact = '✨'

  let grupos = `
🌟 *¡Bienvenido a los grupos oficiales de 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩!* 🌟

💥 *Únete y no te pierdas ninguna novedad:* 

🔥 *${namegrupo}*  
👉 ${gp1}

🎯 *${namechannel}*  
👉 ${channel}

🚀 *Creado con ❤️ por*  
${dev}

📲 ¡Te esperamos con toda la buena vibra! 
`.trim()

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', grupos, m)
  await m.react(emojiReact)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler