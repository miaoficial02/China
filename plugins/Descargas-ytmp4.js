import fetch from 'node-fetch';
import axios from 'axios';

const MAX_FILE_SIZE = 280 * 1024 * 1024;
const VIDEO_THRESHOLD = 70 * 1024 * 1024;
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024;
const REQUEST_LIMIT = 3;
const REQUEST_WINDOW_MS = 10000;
const COOLDOWN_MS = 120000;

const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;

const isValidYouTubeUrl = url =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const res = await axios.head(url, { timeout: 10000 });
    const size = parseInt(res.headers['content-length'], 10);
    if (!size) throw new Error('Tamaño no disponible');
    return size;
  } catch {
    throw new Error('No se pudo obtener el tamaño del archivo');
  }
}

async function ytdl(url) {
  const headers = {
    accept: '*/*',
    referer: 'https://id.ytmp3.mobi/',
    'sec-ch-ua-platform': '"Windows"'
  };

  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  if (!videoId) throw new Error('Ese link ni parece de YouTube 🙄');

  try {
    const init = await (await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers })).json();
    const convert = await (await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers })).json();

    let info;
    for (let i = 0; i < 3; i++) {
      const res = await fetch(convert.progressURL, { headers });
      info = await res.json();
      if (info.progress === 3) break;
      await new Promise(res => setTimeout(res, 1000));
    }

    if (!info || !convert.downloadURL) throw new Error('No se pudo conseguir el link de descarga 😡');
    return { url: convert.downloadURL, title: info.title || 'Video sin título' };
  } catch (e) {
    throw new Error(`Error mientras lo intentaba bajar: ${e.message}`);
  }
}

function checkRequestLimit() {
  const now = Date.now();
  requestTimestamps.push(now);
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > REQUEST_WINDOW_MS) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= REQUEST_LIMIT) {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
      requestTimestamps.length = 0;
    }, COOLDOWN_MS);
    return false;
  }
  return true;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const react = emoji => m.react(emoji);

  if (!text) {
    return conn.reply(m.chat, `💋 Usa bien el comando, mi amorcito:\n*${usedPrefix}${command} <link de YouTube>*`, m);
  }

  if (!isValidYouTubeUrl(text)) {
    await react('🚫');
    return m.reply('😒 Ese link ni parece de YouTube, no me jodas.');
  }

  if (isCooldown || !checkRequestLimit()) {
    await react('⏳');
    return conn.reply(m.chat, '🛑 ¡Ya pediste muchos! Espera 2 min, cochino desesperado.', m);
  }

  if (isProcessingHeavy) {
    await react('🧨');
    return conn.reply(m.chat, '😤 Estoy descargando algo pesado ya, espérate y no seas ansioso.', m);
  }

  await react('🎬');

  try {
    const { url, title } = await ytdl(text);
    const size = await getSize(url);

    if (size > MAX_FILE_SIZE) {
      await react('❌');
      throw new Error('📦 Ese video está *muy gordo* (más de 280MB).');
    }

    const isHeavy = size > HEAVY_FILE_THRESHOLD;
    if (isHeavy) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '📥 Este video está pesadito... pero aguanta, que ya viene.', m);
    }

    const caption = `
💋 *Descarga cochina lista* 💄
🎞️ *Título:* ${title}
📦 *Tamaño:* ${formatSize(size)}
🔗 *Link original:* ${text}
⚔️ *Bot:* 𝗩𝗟𝗔𝗗𝗜𝗟𝗘𝗡𝗔 𝘽𝙤𝙩
`.trim();

    const buffer = await fetch(url).then(res => res.buffer());

    await conn.sendFile(
      m.chat,
      buffer,
      `${title}.mp4`,
      caption,
      m,
      null,
      {
        mimetype: 'video/mp4',
        asDocument: size >= VIDEO_THRESHOLD,
        filename: `${title}.mp4`
      }
    );

    await react('✅');
    isProcessingHeavy = false;
  } catch (e) {
    await react('❌');
    isProcessingHeavy = false;
    return m.reply(`💔 *ERROR:* ${e.message}`);
  }
};

handler.help = ['ytmp4'];
handler.tags = ['descargas'];
handler.command = ['ytmp4'];
handler.black = true;

export default handler;