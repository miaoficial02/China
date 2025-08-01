import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🎵 Ejemplo de uso:\n*${usedPrefix + command} Joji - Ew*`);
  }

  conn.sendMessage(m.chat, { react: { text: "🎶", key: m.key } });

  const appleMusic = {
    search: async (query) => {
      const url = `https://music.apple.com/us/search?term=${encodeURIComponent(query)}`;
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];

        $('.top-search-lockup').each((_, el) => {
          const title = $(el).find('.top-search-lockup__primary__title').text().trim();
          const subtitle = $(el).find('.top-search-lockup__secondary').text().trim();
          const link = $(el).find('a[href*="/album/"]').attr('href');

          if (title && subtitle && link) {
            results.push({ title, subtitle, link: `https://music.apple.com${link}` });
          }
        });

        return results;
      } catch (error) {
        return [];
      }
    }
  };

  const appledown = {
    getData: async (url) => {
      try {
        const res = await axios.get(`https://aaplmusicdownloader.com/api/applesearch.php?url=${url}`, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0'
          }
        });
        return res.data;
      } catch (e) {
        return {};
      }
    },
    getAudio: async (trackName, artist, urlMusic, token) => {
      const data = {
        song_name: trackName,
        artist_name: artist,
        url: urlMusic,
        token: token
      };
      try {
        const response = await axios.post(
          'https://aaplmusicdownloader.com/api/composer/swd.php',
          qs.stringify(data),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        return response.data.dlink;
      } catch {
        return null;
      }
    },
    download: async (url) => {
      try {
        const musicData = await appledown.getData(url);
        if (!musicData || !musicData.name) throw '❌ No se pudo extraer la información de descarga.';

        const formData = encodeURIComponent(JSON.stringify([
          musicData.name,
          musicData.albumname,
          musicData.artist,
          musicData.thumb,
          musicData.duration,
          musicData.url
        ]));

        const res = await axios.post('https://aaplmusicdownloader.com/song.php', `data=${formData}`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const $ = cheerio.load(res.data);
        const trackName = $('td:contains("Track Name:")').next().text();
        const artist = $('td:contains("Artist:")').next().text();
        const token = $('a#download_btn').attr('token');
        const thumb = $('figure.image img').attr('src');

        const dlink = await appledown.getAudio(trackName, artist, url, token);
        if (!dlink) throw '⚠️ No se pudo obtener el enlace de audio.';

        return {
          success: true,
          name: trackName,
          artist,
          thumb,
          duration: $('td:contains("Duration:")').next().text(),
          download: dlink,
          url
        };
      } catch (err) {
        return { success: false, message: err.toString() };
      }
    }
  };

  const results = await appleMusic.search(text);
  if (!results.length) return m.reply('❌ No se encontraron resultados.');

  const music = await appledown.download(results[0].link);
  if (!music.success) return m.reply(`🚫 Error: ${music.message}`);

  const { name, artist, download, duration, thumb, url } = music;

  await conn.sendMessage(m.chat, {
    audio: { url: download },
    mimetype: 'audio/mp4',
    fileName: `${name} - ${artist}.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: `${name} - ${artist}`,
        body: `🎧 Duración: ${duration}`,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumb)).data
      }
    }
  }, { quoted: m });

  await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
};

handler.help = ['music'];
handler.tags = ['downloader'];
handler.command = /^(applemusicplay|music|play)$/i;
handler.limit = 3;
handler.register = true;

export default handler;