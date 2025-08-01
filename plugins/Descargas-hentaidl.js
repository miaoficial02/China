import fetch from "node-fetch";
import cheerio from "cheerio";
import { JSDOM } from "jsdom";

const imagen1 = 'https://files.cloudkuimages.guru/images/6UZu8I1K.jpg'; // miniatura predeterminada
const redes = ' '; // tu red social o canal de promo

let handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `😳 *Y la palabra clave, pervertido?*\n\n🧪 *Ejemplo:* hent Boku ni Harem Sexfriend`, m);
    }

    m.react('⌛');

    if (text.includes('https://veohentai.com/ver/')) {
      const videoInfo = await getInfo(text);
      if (!videoInfo) return conn.reply(m.chat, '❌ *No se encontró información del video.*', m);

      const videoUrl = videoInfo.videoUrl;
      const peso = await size(videoUrl);

      let cap = `
🔞 *Veohentai - Descarga directa*

📌 *Título:* ${videoInfo.title}
📈 *Vistas:* ${videoInfo.views}
👍 *Likes:* ${videoInfo.likes}
👎 *Dislikes:* ${videoInfo.dislikes}
💾 *Peso estimado:* ${peso}
🔗 *Link:* ${text}
`.trim();

      await conn.sendMessage(m.chat, {
        text: cap,
        contextInfo: {
          externalAdReply: {
            title: videoInfo.title,
            body: "Descargar Hentai 🍑",
            thumbnail: imagen1,
            sourceUrl: text,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      await conn.sendFile(m.chat, videoUrl, `${videoInfo.title}.mp4`, '', m, {
        document: true
      });

      m.react('✅');
    } else {
      const results = await searchHentai(text);
      if (!results.length) {
        return conn.reply(m.chat, '😿 *No encontré resultados, mi ciela.*', m);
      }

      let cap = `🔍 *Resultados calientes encontrados:*\n`;

      results.slice(0, 10).forEach((res, i) => {
        cap += `\n\`${i + 1}\` 🍑 *${res.titulo}*\n🔗 ${res.url}`;
      });

      await conn.sendMessage(m.chat, {
        text: cap,
        contextInfo: {
          externalAdReply: {
            title: "Resultados de búsqueda",
            body: "Veohentai 🔥",
            thumbnail: imagen1,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      m.react("🫦");
    }
  } catch (err) {
    console.error(err);
    return conn.reply(m.chat, `💥 *Ups... algo salió mal...*\n\n${err.message}`, m);
  }
};

handler.help = ["hentai"];
handler.command = ["hentai", "hent", "hentaidl", "htdl"];
handler.tags = ["descargas"];
handler.diamond = true;

export default handler;

// Función para buscar resultados
async function searchHentai(text) {
  const url = `https://veohentai.com/?s=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    let resultados = [];

    $(".grid a").each((i, el) => {
      const titulo = $(el).find("h2").text().trim();
      const link = $(el).attr("href");
      if (titulo && link) resultados.push({ titulo, url: link });
    });

    return resultados;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Función para extraer info del video
async function getInfo(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const iframe = document.querySelector(".aspect-w-16.aspect-h-9 iframe");
    if (!iframe) return null;

    const iframeSrc = iframe.src;
    const videoResponse = await fetch(iframeSrc);
    const videoHtml = await videoResponse.text();
    const match = videoHtml.match(/data-id="\/player\.php\?u=([^&]*)/);
    if (!match) throw new Error("No se encontró el enlace del video.");

    const videoUrl = atob(match[1]);

    return {
      videoUrl,
      title: document.querySelector("h1.text-whitegray.text-lg").textContent.trim(),
      views: document.querySelector("h4.text-whitelite.text-sm").textContent.trim(),
      likes: document.querySelector("#num-like").textContent.trim(),
      dislikes: document.querySelector("#num-dislike").textContent.trim()
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Función para calcular peso estimado
async function size(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const len = parseInt(res.headers.get('content-length'), 10);

    if (!len) throw new Error('No se pudo determinar el tamaño');
    if (len >= 1e9) return (len / 1e9).toFixed(2) + ' GB';
    if (len >= 1e6) return (len / 1e6).toFixed(2) + ' MB';
    return (len / 1e3).toFixed(2) + ' KB';
  } catch (err) {
    return 'Desconocido';
  }
}