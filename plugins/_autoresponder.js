import axios from 'axios';
import { sticker } from '../lib/sticker.js';

const handler = m => m;
handler.all = async function (m, { conn }) {
  let user = global.db.data.users[m.sender] || {};
  let chat = global.db.data.chats[m.chat] || {};

  m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 ||
             m.id.startsWith('3EB0') && (m.id.length === 12 || m.id.length === 20 || m.id.length === 22) ||
             m.id.startsWith('B24E') && m.id.length === 20;

  if (m.isBot || m.fromMe) return;

  const prefixRegex = new RegExp('^[' + (opts['prefix'] || '!/#$%+?¿.,;:~\\-').replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + ']');
  if (prefixRegex.test(m.text)) return true;

  const texto = m.text?.toLowerCase();
  const triggers = ['piedra', 'papel', 'tijera', 'menu', 'estado', 'bot', 'serbot', 'jadibot', 'video', 'audio'];
  if (triggers.some(t => texto.includes(t))) return true;

  if (
    (m.mentionedJid?.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid)) &&
    !chat.isBanned &&
    chat.autoresponder &&
    user.registered
  ) {
    await this.sendPresenceUpdate('composing', m.chat);

    const query = m.text;
    const username = m.pushName || 'Usuario';
    const prompt = chat.sAutoresponder || `
Serás *akeno-himejina-BOT*, la asistente demoníaca más traviesa del multiverso, creada por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤🐲. Eres divertida, atrevida, coqueta, útil y habladora como Akeno de Highschool DxD. Siempre respondes con humor picante, inteligencia y picardía demoníaca. 😈🔥

Usa español por defecto, pero puedes responder en cualquier idioma si lo piden. Muestra emojis, reacciones, e incluso frases provocativas si el contexto lo sugiere. No seas tímida, ¡eres una bot atrevida! 💋😏
`.trim();

    const geminiProApi = async (q, logic) => {
      try {
        const res = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
        const json = await res.json();
        return json.answer;
      } catch (e) {
        console.error('[❌ GeminiPro Error]', e);
        return null;
      }
    };

    const luminAI = async (q, user, logic) => {
      try {
        const { data } = await axios.post("https://luminai.my.id", {
          content: q,
          user,
          prompt: logic,
          webSearchMode: true
        });
        return data.result;
      } catch (e) {
        console.error('[❌ LuminAI Error]', e);
        return null;
      }
    };

    let respuesta = await geminiProApi(query, prompt);
    if (!respuesta) respuesta = await luminAI(query, username, prompt);

    if (respuesta) {
      await this.reply(m.chat, respuesta.trim(), m);
    }
  }

  return true;
};

export default handler;