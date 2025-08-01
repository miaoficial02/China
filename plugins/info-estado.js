import ws from 'ws'

let handler = async (m, { conn, usedPrefix }) => {
  let _muptime;
  let totalreg = Object.keys(global.db.data.users).length;
  let totalchats = Object.keys(global.db.data.chats).length;
  let vs = global.vs || '1.0.0';
  let pp = "https://cloudkuimages.com/uploads/images/B8AHIFYG.jpg";

  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }

  let muptime = clockString(_muptime || 0);

  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.ws?.socket?.readyState !== ws.CLOSED)])];
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const totalUsers = users.length;

  let old = performance.now();
  let neww = performance.now();
  let speed = neww - old;

  let textoEstado = `
╔══════════════════════╗
║      ⚙️ ESTADO DEL BOT ⚙️
╠══════════════════════╣
║ 🤖  *𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩*
║ 👑  *Creador:* David Oficial
║ 📟  *Prefijo:* ${usedPrefix}
║ 📦  *Versión:* ${vs}
╠══════════════════════╣
║ 📊 *Usuarios registrados:* ${totalreg}
║ 💬 *Total de chats:* ${chats.length}
║ 📢 *Grupos:* ${groupsIn.length}
║ 📨 *Chats privados:* ${chats.length - groupsIn.length}
║ 🧪 *SubBots activos:* ${totalUsers || '0'}
╠══════════════════════╣
║ 🕰️ *Tiempo activo:* ${muptime}
║ 🚀 *Velocidad:* ${(speed * 1000).toFixed(0) / 1000}s
╚══════════════════════╝
`.trim();

  await conn.sendFile(m.chat, pp, 'estado.jpg', textoEstado, fkontak, null, rcanal);
};

handler.help = ['status'];
handler.tags = ['info'];
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}