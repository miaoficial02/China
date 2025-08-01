import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  let chat = global.db.data.chats[m.chat]
  if (!chat || !chat.detect) return

  let usuario = `@${m.sender.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.cloudkuimages.guru/images/kb8DuV6A.jpg'

  let nombre = `🌹 *${usuario}* se creyó diseñador y le cambió el nombre a esta joyita de grupo.\n\n📛 Nuevo nombre:\n*${m.messageStubParameters?.[0] || ''}*`
  let foto = `📸 *${usuario}* dijo “foto fea no” y cambió la imagen del grupo 💅`
  let edit = `🔧 *${usuario}* decidió que ${m.messageStubParameters?.[0] === 'on' ? 'solo los dioses del grupo (admins)' : 'cualquiera con dedos'} puede editar la info 😌`
  let newlink = `🔗 Ay no... *${usuario}* restableció el link como si fuéramos a invitar a alguien decente.`
  let status = `🚪 *${usuario}* ${m.messageStubParameters?.[0] === 'on' ? 'cerró el grupo como si fuera suyo 🔒' : 'abrió el grupo a la jungla 🔓'}\n\n💬 Ahora pueden hablar ${m.messageStubParameters?.[0] === 'on' ? 'solo los admins, como debe ser 💅' : 'todos, qué miedo 😬'}`
  let admingp = `👑 *${m.messageStubParameters?.[0]?.split('@')[0]}* ahora es admin del corral 🎉\n\n💅 Y todo gracias a:\n*» ${usuario}*`
  let noadmingp = `😿 *${m.messageStubParameters?.[0]?.split('@')[0]}* ya no es admin... qué bajón.\n\n🫠 Acción realizada por:\n*» ${usuario}*`

  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_CHANGE_SUBJECT: // 21
      await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_ICON: // 22
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_INVITE_LINK: // 23
      await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_SETTINGS: // 25
      await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_ANNOUNCE: // 26
      await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.PARTICIPANT_PROMOTE: // 29
      await conn.sendMessage(m.chat, {
        text: admingp,
        mentions: [m.sender, m.messageStubParameters?.[0]]
      }, { quoted: fkontak })
      break
    case WAMessageStubType.PARTICIPANT_DEMOTE: // 30
      await conn.sendMessage(m.chat, {
        text: noadmingp,
        mentions: [m.sender, m.messageStubParameters?.[0]]
      }, { quoted: fkontak })
      break
    default:
      break
  }
}