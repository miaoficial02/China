const xpperestrellas = 350;

const handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^rentar/i, '');
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].estrellas / xpperestrellas)
      : parseInt(count)
    : args[0]
    ? parseInt(args[0])
    : 1;

  count = Math.max(1, count);

  let userData = global.db.data.users[m.sender];

  if (userData.estrellas >= xpperestrellas * count) {
    userData.estrellas -= xpperestrellas * count;
    userData.tokens += count;

    global.db.data.userRents = global.db.data.userRents || {};
    let userRents = global.db.data.userRents[m.sender] || {
      tokens: 0,
      groups: []
    };

    userRents.tokens += count;
    global.db.data.userRents[m.sender] = userRents;

    conn.reply(
      m.chat,
      `
💖 *𝑽𝑳𝑨𝑫𝑰𝑳𝑬𝑵𝑨 dice...* 💅
┌─『 *Compra Confirmada* 』─⬣
│✨ *Has rentado:* +${count} Token(s)
│🌟 *Gastaste:* -${xpperestrellas * count} Estrellitas
│🎟️ *Tokens Disponibles:* ${userRents.tokens}
└───────────────💋`,
      m
    );
  } else {
    conn.reply(
      m.chat,
      `🚫 *Ay mi ciela...*\nNo tienes suficientes *estrellas 🌟* para rentar *${count}* token(s). ¡Ponte a brillar más! 💫`,
      m
    );
  }
};

handler.help = ['rentar'];
handler.tags = ['grupo'];
handler.register = true;
handler.command = ['rentar'];

handler.disabled = false;

export default handler;