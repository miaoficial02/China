// 🌐 PLUGIN DESCARGA MEDIAFIRE – VLADILENA BOT 💋
// 🛠️ Creado por David oficial, mejorado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`❌ Ingresa un link de *Mediafire*.\n\n📌 *Ejemplo:* ${usedPrefix}${command} https://www.mediafire.com/file/xxx/file`);
  }

  await conn.sendMessage(m.chat, { react: { text: "📥", key: m.key }});

  try {
    let res = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`);
    let json = await res.json();

    if (!json.status || !json.data || !json.data[0]?.link) {
      throw `🥵 No se pudo obtener el archivo. Asegúrate de que el link sea válido.`;
    }

    let { nama, link, size, mime } = json.data[0];
    await conn.sendFile(m.chat, link, nama, `🎧 *Archivo descargado desde Mediafire*\n\n*📄 Nombre:* ${nama}\n*📦 Tamaño:* ${size}\n*📁 Formato:* ${mime}\n\n💖 *Desarrollado por:* 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 💋`, m);

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }});
  } catch (e) {
    console.error(e);
    m.reply(`❌ Error al descargar el archivo.\n\n🔍 *Detalles:* ${e}`);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }});
  }
};

handler.help = ['mediafire <url>'];
handler.tags = ['descargas'];
handler.command = /^(mediafire|mf)$/i;
handler.premium = false;
handler.dragones = 1;
handler.register = true;

export default handler;