import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix, text }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`🔞 Ay mi amor... El contenido *NSFW* está *desactivado* en este grupo de calienturientos.\n\n> Dile a un admin que lo active con *${usedPrefix}nsfw on* si quieren ver porno rico 😏`);
  }

  if (!args[0]) {
    return conn.reply(m.chat, `💦 Mmm... ¿y el link mi cielo?\n\nMándame el enlace de *Xvideos* si de verdad quieres ver cochinadas 😈`, m);
  }

  try {
    conn.reply(m.chat, `🔥 Espérate que ya estoy descargando el video bien caliente para ti...\n\n— Si tarda, es porque el video está bien largo... como tú lo quieres 😏`, m);
    
    const res = await xvideosdl(args[0]);
    conn.sendMessage(m.chat, {
      document: { url: res.result.url },
      mimetype: 'video/mp4',
      fileName: res.result.title
    }, { quoted: m });
  } catch (e) {
    throw `❌ Ay no, no pude descargar esa porno chafa 🙄\n\n— Asegúrate que sea un link válido como este:\n◉ https://www.xvideos.com/video70389849/pequena_zorra_follada_duro`;
  }
};

handler.command = ['xvideosdl'];
handler.register = true;
handler.group = false;
handler.coin = 10;
handler.tags = ['nsfw'];
handler.premium = false;

export default handler;

async function xvideosdl(url) {
  return new Promise((resolve, reject) => {
    fetch(`${url}`, { method: 'get' })
      .then(res => res.text())
      .then(res => {
        let $ = cheerio.load(res, { xmlMode: false });
        const title = $("meta[property='og:title']").attr("content");
        const keyword = $("meta[name='keywords']").attr("content");
        const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views";
        const vote = $("div.rate-infos > span.rating-total-txt").text();
        const likes = $("span.rating-good-nbr").text();
        const deslikes = $("span.rating-bad-nbr").text();
        const thumb = $("meta[property='og:image']").attr("content");
        const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");
        resolve({ status: 200, result: { title, url: videoUrl, keyword, views, vote, likes, deslikes, thumb } });
      })
      .catch(err => reject(err));
  });
}