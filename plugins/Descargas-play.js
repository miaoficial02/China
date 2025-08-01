import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `❌ ¡Hey! Tienes que escribir qué quieres buscar.\nEjemplo: ${usedPrefix + command} Never Gonna Give You Up`;

  // Buscar en YouTube
  const results = await yts(text);
  if (!results || !results.videos || results.videos.length === 0)
    throw '❌ No encontré ningún video con ese título. Intenta con otra búsqueda.';

  const video = results.videos[0];

  const caption = `🎶 *${video.title}*\n👤 *Canal:* ${video.author.name}\n⏰ *Duración:* ${video.timestamp}\n\nElige cómo quieres descargarlo:`;

  const buttons = [
    { buttonId: `.ytmp3 ${video.url}`, buttonText: { displayText: '🎵 Audio' } },
    { buttonId: `.ytmp4 ${video.url}`, buttonText: { displayText: '📽️ Video' } }
  ];

  await conn.sendMessage(
    m.chat,
    {
      image: { url: video.thumbnail },
      caption,
      footer: '𝙑𝙇𝘼𝘿𝙄𝙇𝙀𝙉𝘼 𝘽𝙤𝙩 ☠️',
      buttons,
      headerType: 4
    },
    { quoted: m }
  );

  m.react('✅');
};

handler.help = ['play <texto>'];
handler.tags = ['downloader'];
handler.command = /^(play|playvid|play2)$/i;
handler.limit = 6;

export default handler;