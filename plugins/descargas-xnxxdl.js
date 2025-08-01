// 🔥 Comando NSFW XNXX
// 🐉 Desarrollado por 𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & VLADILENA Bot 💋

import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix, isGroup }) => {
  if (!global.db.data.chats[m.chat].nsfw && isGroup) {
    return conn.reply(m.chat, `🚫 *Contenido prohibido aquí, mi ciela.*\n🔞 El modo *NSFW* está desactivado.\n\n👑 Un admin puede activarlo con:\n*${usedPrefix}nsfw on*`, m);
  }

  if (!args[0]) {
    return conn.reply(m.chat, `👀 *¿Y el link, mi amor?*\nMándame el enlace de XNXX para sacarte el video bien rico.\n\n🧪 Ejemplo:\n*${usedPrefix + command} https://www.xnxx.com/video-abc123*`, m);
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "🔞", key: m.key }});
    await conn.reply(m.chat, `🍑 *Calentando motores...*\nEstoy preparando tu video sucio...\n\nEspera un poquito, mi amor 💋`, m);

    const res = await fetch(args[0]);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content') || 'Sin título';
    const thumbnail = $('meta[property="og:image"]').attr('content');
    const videoUrl = $('meta[property="og:video"]').attr('content');

    if (!videoUrl) {
      throw '❌ No encontré el video, intenta con otro link mi amor 🥺';
    }

    await conn.sendFile(m.chat, videoUrl, 'video.mp4', `
🔥 *Título:* ${title}
💦 *Enlace:* ${args[0]}

🧨 Disfruta tu porno sucio 😈

🛠️ Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & 💋 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩
`.trim(), m);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `🚫 *No se pudo obtener el video, mi cielo.*\n¿Seguro que me diste un link válido de XNXX?`, m);
  }
};

handler.command = /^xnxx(video)?$/i;
handler.help = ['xnxxvideo <link>'];
handler.tags = ['nsfw'];
handler.premium = false;
handler.register = true;
handler.limit = true;
handler.level = 1;

export default handler;