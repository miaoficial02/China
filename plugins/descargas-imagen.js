import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🌸 *Uso correcto:* ${usedPrefix + command} Hinata sexy`;

  const loadingMsg = '✨ 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 está buscando tu imagen... espera 💋';
  const thumb = 'https://files.cloudkuimages.guru/images/hm6wPCn8.jpg'; // Imagen por defecto para el adReply
  const sourceUrl = 'https://instagram.com/neotokyobot'; // Puedes cambiar este link

  await conn.reply(m.chat, loadingMsg, m, {
    contextInfo: {
      externalAdReply: {
        title: '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩',
        body: 'Buscando imágenes sabrosas 🫦',
        mediaType: 1,
        previewType: 0,
        thumbnail: await (await fetch(thumb)).buffer(),
        sourceUrl
      }
    }
  });

  const res = await googleImage(text);
  const images = [];

  for (let i = 0; i < 4; i++) {
    const url = await res.getRandom();
    images.push(['🍑 Imagen ' + (i + 1), 'Resultado para: ' + text, url, [[]], [[]], [[]], [[]]]);
  }

  await conn.sendCarousel(m.chat, `🔍 *Resultado de búsqueda:* ${text}`, '🖼️ Desliza para ver más', null, images, m);
};

handler.help = ['imagen <texto>'];
handler.tags = ['buscador', 'descargas'];
handler.command = ['imagen', 'image'];
handler.group = true;
handler.register = true;

export default handler;