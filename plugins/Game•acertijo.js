import fs from 'fs';

const timeout = 60000;
const poin = 10;

const handler = async (m, { conn, usedPrefix }) => {
  conn.tekateki = conn.tekateki || {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, '📛 Ay tontito, ¡resuelve el acertijo que ya tienes activo primero! 😒', conn.tekateki[id][0]);
    throw false;
  }

  const tekateki = JSON.parse(fs.readFileSync('./src/game/acertijo.json'));
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const clue = json.response.replace(/[A-Za-z]/g, '_');

  const caption = `
🍭 *𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩* te reta a un jueguito mental, bebé 😈💋

🎯 *Preguntita caliente:* 
*${json.question}*

⏳ *Tienes:* ${(timeout / 1000).toFixed(0)} segunditos ⏱️
🍪 *Premio pa' ti si aciertas:* +${poin} galletitas dulces 💦

Escribe tu respuesta, mi amor... o pierde como el tontito que eres 😝`.trim();

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) {
        await conn.reply(m.chat, `⏰ Se acabó tu tiempo, bebé...\n💔 La respuesta era: *${json.response}*`, conn.tekateki[id][0]);
        delete conn.tekateki[id];
      }
    }, timeout)
  ];
};

handler.help = ['acertijo'];
handler.tags = ['fun'];
handler.command = ['acertijo', 'acert', 'adivinanza', 'tekateki'];

export default handler;