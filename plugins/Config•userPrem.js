const fkontak = {
  key: {
    participants: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
    fromMe: false,
    id: 'Halo'
  },
  message: {
    contactMessage: {
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩\nitem1.TEL;waid=0:0\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
    }
  },
  participant: '0@s.whatsapp.net'
}

const handler = (m) => m

export async function all(m) {
  for (const [jid, user] of Object.entries(global.db.data.users)) {
    if (user.premiumTime && user.premium) {
      if (Date.now() >= user.premiumTime) {
        user.premiumTime = 0
        user.premium = false
        const textoo = `
🔥 *Puf!* Se acabó tu tiempo PREMIUM, baby 😢

💔 Pero no te preocupes, la diosa 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 siempre te espera para que regreses.

✨ *Corre a renovar y vuelve a brillar como estrella!* 🌟
        `.trim()
        await this.sendMessage(jid, { text: textoo, mentions: [jid] }, { quoted: fkontak })
      }
    }
  }
}