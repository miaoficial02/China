// 💋 Hinata Bot – Rechazo automático a números molestos 💅
// 🛠️ Basado en OfcKing – Modificado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲

// Este handler rechaza automáticamente a usuarios con prefijos sospechosos cuando se activa `autoRechazar`
// Funciona solo si el bot es admin en el grupo.

let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return !1

  let chat = global.db.data.chats[m.chat]
  if (!chat.autoRechazar || !isBotAdmin) return

  // Prefijos de países con alta incidencia de spam o bots molestos
  const prefixes = ['6', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48']

  // Si el remitente tiene uno de esos prefijos, lo rechazamos de inmediato
  if (prefixes.some(prefix => m.sender.startsWith(prefix))) {
    await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject')
    console.log(`[⛔️ HinataBot] Usuario rechazado por prefijo sospechoso: ${m.sender}`)
  }
}

export default handler