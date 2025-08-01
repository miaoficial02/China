import fg from 'api-dylux';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!args[0]) {
      return conn.reply(m.chat, `🥵 *¿Y el link, bebé?*\n\n💋 Usa así:\n${usedPrefix + command} https://vm.tiktok.com/ZMreHF2dC/`, m);
    }

    if (!/(?:https?:\/\/)?(?:www\.)?(tiktok\.com|vm\.tiktok\.com)\/\S+/gi.test(text)) {
      return conn.reply(m.chat, `😒 Ese link de TikTok está más chafa que tu ex, pon uno válido.`, m);
    }

    m.react('🔞');

    let data = await fg.tiktok(args[0]);
    let { title, play, duration } = data.result;
    let { nickname } = data.result.author;

    let caption = `✨ *TikTok desnudito pa' ti, beibi* 💋

👄 *Autor:* ${nickname}
🍑 *Título:* ${title}
⏳ *Duración:* ${duration}

🫦 *𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩* te lo sirvió calientito 🔥`;

    await conn.sendFile(m.chat, play, `tiktok.mp4`, caption, m);

    m.react('✅');
  } catch (e) {
    return conn.reply(m.chat, `💔 *Ups... se me resbaló el tanga y el video no salió:*\n${e.message}`, m);
  }
};

handler.help = ["tiktok"];
handler.tags = ["dl"];
handler.command = ["tt", "tiktok", "ttdl"];

export default handler;