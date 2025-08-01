import db from '../lib/database.js';
let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('💌 *Cielito, dime el link del grupo al que quieres llevarme.*');

  let [, code] = text.match(linkRegex) || [];
  if (!code) return m.reply('🚫 *Ese enlace no es válido, mi cielo.*');

  global.db.data.groupRents = global.db.data.groupRents || {};
  global.db.data.userRents = global.db.data.userRents || {};

  let userRents = global.db.data.userRents[m.sender];

  if (!userRents || userRents.tokens <= 0) {
    return m.reply('😒 *No tienes tokens suficientes para rentarme, ve a comprar más con /rentar 💅.*');
  }

  let groupId;
  try {
    groupId = await conn.groupAcceptInvite(code);
  } catch (e) {
    if (/already/.test(e.message)) {
      return m.reply('⚠️ *Ya estoy en ese grupo, mi ciela.*');
    }
    return m.reply(`❗ *Ups... algo salió mal: ${e.message}*`);
  }

  global.db.data.groupRents[groupId] = {
    user: m.sender,
    tokenCount: userRents.tokens,
    startTime: Date.now(),
    duration: userRents.tokens * 24 * 60 * 60 * 1000 // 1 token = 1 día
  };

  userRents.groups.push(groupId);
  userRents.tokens = 0;

  let tiempo = global.db.data.groupRents[groupId].tokenCount;
  let caption = `✨ *𝑽𝑳𝑨𝑫𝑰𝑳𝑬𝑵𝑨 Bot ha llegado* 💅\n\n🗓️ *Alquiler activo por:* ${tiempo} día(s)\n💋 *Disfruta mientras dure, mi amor.*`;

  let gif = 'https://telegra.ph/file/32e696946433c03588726.mp4';
  await conn.sendMessage(groupId, {
    video: { url: gif },
    gifPlayback: true,
    caption,
    mentions: [m.sender]
  });

  conn.reply(m.chat, `💖 *Me uní exitosamente al grupo!* El bot estará activo por *${tiempo} día(s)*.`, m);
};

handler.tags = ['grupos'];
handler.help = ['rentar2 *<link-del-grupo>*'];
handler.command = ['rentar2'];
handler.register = true;
handler.botAdmin = true;

export default handler;