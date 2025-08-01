let handler = async (m, { conn, isAdmin, isROwner }) => {
  if (!(isAdmin || isROwner)) return dfail('admin', m, conn);

  global.db.data.chats[m.chat].isBanned = true;

  await conn.reply(m.chat, `🚫 * 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 se va a la verga de este grupo...*\n\nMe banearon perras, ya no me jodan 💅`, m, rcanal);
  await m.react('💀');
};

handler.help = ['banearbot'];
handler.tags = ['group'];
handler.command = ['banearbot', 'banchat'];
handler.group = true;

export default handler;