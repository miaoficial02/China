import { areJidsSameUser } from '@whiskeysockets/baileys';

let handler = async (m, { conn, participants, command, text }) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const miembros = participants.map(u => u.id);
  const scanCount = text ? parseInt(text) : miembros.length;

  let fantasmas = [];

  for (let i = 0; i < scanCount; i++) {
    let id = miembros[i];
    let user = global.db.data.users[id];

    if (
      (!user || user.chat === 0) &&
      !(participants.find(p => p.id === id)?.admin) &&
      !user?.whitelist
    ) {
      fantasmas.push(id);
    }
  }

  if (command === 'fantasmas') {
    if (fantasmas.length === 0) {
      return m.reply('✨ Este grupo está activo, no hay perras fantasmas 💅');
    }

    return conn.reply(
      m.chat,
      `🔎 *FANTASMAS DETECTADAS*\n\n${fantasmas
        .map(v => `👻 @${v.replace(/@.+/, '')}`)
        .join('\n')}\n\n⚠️ No se han detectado mensajes de estas bellezas.`,
      m,
      { mentions: fantasmas }
    );
  }

  if (command === 'kickfantasmas') {
    if (fantasmas.length === 0) {
      return m.reply('✨ Este grupo está lleno de vida, no hay fantasmas que echar 💁‍♀️');
    }

    await m.reply(
      `💣 *EXPULSIÓN DE FANTASMAS*\n\nEstas bellezas serán echadas como se merecen:\n${fantasmas
        .map(v => `👢 @${v.replace(/@.+/, '')}`)
        .join('\n')}\n\n⏳ Se irán cada 10 segundos...`,
      null,
      { mentions: fantasmas }
    );

    let chat = global.db.data.chats[m.chat];
    chat.welcome = false;

    for (let ghost of fantasmas) {
      if (
        ghost.endsWith('@s.whatsapp.net') &&
        !participants.find(p => areJidsSameUser(p.id, ghost))?.admin
      ) {
        await conn.groupParticipantsUpdate(m.chat, [ghost], 'remove').catch(console.log);
        await delay(10000);
      }
    }

    chat.welcome = true;
  }
};

handler.command = ['fantasmas', 'kickfantasmas'];
handler.tags = ['grupo'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;