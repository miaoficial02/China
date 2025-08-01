var handler = async (m, { conn, participants, usedPrefix, command }) => {
  const user = m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
      ? m.quoted.sender 
      : null;

  if (!user) {
    return conn.reply(
      m.chat,
      `💅 *¿Y a quién crees que voy a sacar, mi ciela?*\n\nEtiqueta o responde a alguien que quieras volar del grupo.`,
      m
    );
  }

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  if (user === conn.user.jid)
    return conn.reply(m.chat, `🚫 ¿¡Estás tratando de echarme a mí!? 🤨`, m);

  if (user === ownerGroup)
    return conn.reply(m.chat, `🚫 No me atrevería a sacar al *propietario del grupo* 😳`, m);

  if (user === ownerBot)
    return conn.reply(m.chat, `🚫 ¡Ese es el *dueño del bot*, estúpida! 😤`, m);

  // Ejecuta la eliminación
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

  await conn.reply(
    m.chat,
    `👢 *Una patada bien dada a @${user.split('@')[0]}* fuera del grupo 👋\nNo vuelvas a hacer enojar a 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 😈`,
    m,
    { mentions: [user] }
  );
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;