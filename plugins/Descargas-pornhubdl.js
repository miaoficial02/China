// 💥 Código By 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 - Diseño Mejorado

import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) 
    return conn.reply(m.chat, `🚫 *Oops!* Parece que olvidaste poner el enlace.\n\n📌 Usa así:\n${usedPrefix + command} https://www.pornhub.com/view_video.php?viewkey=xxxx`, m);

  try {
    let api = `https://www.dark-yasiya-api.site/download/phub?url=${text}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.result) 
      return conn.reply(m.chat, '❌ No encontré nada para ese enlace, revisa y vuelve a intentar.', m);

    let videoData = json.result;
    let resu = videoData.format[0];
    let url = resu.download_url;
    let title = videoData.video_title || '🎬 Video Pornhub';

    m.react('⌛');

    let caption = `
🔥 *¡Tu video está listo para descargar!* 🔥

🎞️ *Título:* ${title}
📤 *Descarga tu video aquí abajo*

*Nota:* El video puede tardar un poco en cargar, sé paciente 😘
`;

    await conn.sendMessage(m.chat, { video: { url }, caption }, { quoted: m });
    m.react('✅');
  } catch (error) {
    m.reply(`⚠️ Oops, ocurrió un error:\n\n${error.message}`);
    console.error(error);
  }
};

handler.command = ['pornhubdl', 'phdl'];
handler.tags = ['descargas'];
handler.help = ['pornhubdl'];
handler.estrellas = 9;

export default handler;