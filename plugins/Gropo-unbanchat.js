let handler = async (m, { conn, isAdmin, isROwner }) => {
  if (!(isAdmin || isROwner)) {
    return dfail('admin', m, conn);
  }

  global.db.data.chats[m.chat].isBanned = false;
  
  await conn.reply(m.chat, `💋 *
   𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩* ha regresado al desmadre de este grupo...\n\nYa pueden usarme perras 🥵`, m, rcanal);
  await m.react('💦');
};

handler.help = ['desbanearbot'];
handler.tags = ['group'];
handler.command = ['desbanearbot', 'unbanchat'];
handler.group = true;

export default handler;