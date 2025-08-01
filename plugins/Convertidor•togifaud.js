let handler = async (m, { conn, usedPrefix, command }) => {
  const rwait = '⏳ Espera mi amorcito, estoy convirtiendo el video...';
  const done = '✅ Listo bb, aquí tienes tu gif animado';
  const icons = 'https://files.cloudkuimages.guru/images/3rfWPs0h.jpg'; // Puedes poner tu imagen personalizada aquí
  const fkontak = { key: { fromMe: false, participant: "0@s.whatsapp.net", ...(m.chat ? { remoteJid: m.chat } : {}) }, message: { contactMessage: { displayName: "Hinata 𝘽𝙤𝙩", vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀\nORG:𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩;\nTEL;type=CELL;type=VOICE;waid=573142495895:+57 314 2495895\nEND:VCARD` } } };
  const waitSticker = 'https://files.cloudkuimages.guru/images/3rfWPs0h.jpg'; // Imagen del mensaje "wait"
  const packname = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀  𝘽𝙤𝙩 💕';
  const dev = 'Creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲';
  const channel = 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A';

  if (!m.quoted) return conn.reply(m.chat, `🚩 Responde a un *video mi cielo* para convertirlo en gif.`, m);

  let q = m.quoted || m;
  let mime = (q.msg || q).mimetype || '';
  if (!/video\/mp4/.test(mime)) return conn.reply(m.chat, `🚩 Eso no es un *video mi amor*. Responde a un video mp4.`, m);

  await m.react('💫');
  let media = await q.download();

  await conn.reply(m.chat, rwait, m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: channel,
        mediaType: 1,
        showAdAttribution: true,
        title: packname,
        body: dev,
        previewType: 0,
        thumbnailUrl: icons,
        sourceUrl: channel
      }
    }
  });

  let caption = '✨ *Aquí está tu gif mi vida.*\n\n💋 *Disfrútalo con amor, te lo da  𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 💕*';
  await conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption }, { quoted: fkontak });

  await m.react('✅');
};

handler.help = ['togifaud'];
handler.tags = ['convertidor'];
handler.command = ['togifaud'];

export default handler;