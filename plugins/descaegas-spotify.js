import fetch from 'node-fetch';

const cacheSpotify = new Set();

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`
┏━━━━━━━━━━━━━━━┓
┃ 😡 *¿Y el nombre, baboso?*
┃ 🧼 No seas bruto, pon el nombre de la rola.
┃ 🎧 *Usa así:* ${usedPrefix + command} <nombre>
┃ 🧪 *Ejemplo:* ${usedPrefix + command} Enemy - Imagine Dragons
┗━━━━━━━━━━━━━━━┛
    `.trim());
  }

  m.react('🎧');

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.result || !json.result.downloadUrl) {
      throw '❌ No encontré esa rola, búscate otra...';
    }

    const { title, artist, duration, downloadUrl } = json.result;

    if (cacheSpotify.has(downloadUrl)) {
      return m.reply(`
┏━━━━━━━━━━━━━━┓
┃ 😤 *¡Esa ya la mandé, menso!*
┃ 🧠 No repitas la misma canción.
┃ 🧽 ¡Hay millones de rolas!
┗━━━━━━━━━━━━━━┛
      `.trim());
    }

    cacheSpotify.add(downloadUrl);
    setTimeout(() => cacheSpotify.delete(downloadUrl), 60 * 1000);

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg'
    }, { quoted: m });

    await m.reply(`
┏━━━━━🎵 *SPOTIFY* 🎵━━━━━┓
┃ 📀 *Título:* ${title}
┃ 🎤 *Artista:* ${artist}
┃ ⏱️ *Duración:* ${duration}
┃ ✅ *Estado:* Enviada perr@~
┃ 💋 *Desarrollado por:*
┃ 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & DAvid Oficial 
┗━━━━━━━━━━━━━━━━━━━━━━━┛
    `.trim());

    m.react('🧠');

  } catch (e) {
    console.error(e);
    m.reply(`
┏━━━━━💥 *ERROR* 💥━━━━┓
┃ 😿 No encontré la canción.
┃ 🧹 Prueba con otro nombre.
┃ 📡 O espera, tal vez la API se cayó.
┗━━━━━━━━━━━━━━━━━━━━━┛
    `.trim());
    m.react('❌');
  }
};

handler.help = ['spotify *<nombre>*'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'spotifydl'];

export default handler;