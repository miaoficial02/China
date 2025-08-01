//🩸 Sistema anti-spam árabe creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 x Akeno Himejima

const codigosArabes = ['+212', '+971', '+20', '+966', '+964', '+963', '+973', '+968', '+974'];
const regexArabe = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
const regexComando = /^[\/!#.]/;

global.advertenciasArabes = global.advertenciasArabes || {};

export async function before(m, { conn, isOwner, isROwner }) {
  try {
    if (
      m.isBaileys ||
      m.isGroup ||
      !m.message ||
      !m.sender ||
      typeof m.text !== 'string' ||
      isOwner ||
      isROwner
    ) return false;

    const numero = m.sender;
    const texto = m.text;
    const numeroLimpio = numero.replace(/[^0-9]/g, '');

    const esArabe = regexArabe.test(texto) || codigosArabes.some(pref => numeroLimpio.startsWith(pref.replace('+', '')));
    const esComando = regexComando.test(texto);

    if (esArabe && !esComando) {
      global.advertenciasArabes[numero] = (global.advertenciasArabes[numero] || 0) + 1;
      const advertencias = global.advertenciasArabes[numero];

      if (advertencias >= 3) {
        await m.reply(`
💀 *𝐒𝐄𝐋𝐋𝐎 𝐃𝐄𝐌𝐎𝐍𝐈𝐀𝐂𝐎 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎* 💀
━━━━━━━━━━━━━━━━━━━━━━
🔞 @${numero.split('@')[0]}
❌ *Usuario no autorizado detectado*

📛 Intentos: *3/3*
🔒 Estado: *𝐁𝐋𝐎𝐐𝐔𝐄𝐀𝐃𝐎 𝐏𝐄𝐑𝐌𝐀𝐍𝐄𝐍𝐓𝐄*
🔥 Tu alma fue sellada por Akeno Himejima.

💬 Si crees que fue error, únete al gremio y suplica redención:
👉 https://chat.whatsapp.com/FaH0I7KkHX2ADdBueuLdDR
━━━━━━━━━━━━━━━━━━━━━━`);

        await conn.updateBlockStatus(m.chat, 'block');
        delete global.advertenciasArabes[numero];
        console.log(`[⛔ BLOQUEADO] ${numero}`);
      } else {
        await m.reply(`
⚠️ *𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀 ${advertencias}/3* ⚠️
━━━━━━━━━━━━━━━━━━━━━━
🚫 Se detectó texto en idioma o formato no permitido.

🕳️ Solo se aceptan comandos:
Ej: */menu*, */code*, *.help

🧨 A la 3ra advertencia serás *sellado permanentemente*.

💬 Este bot no tolera spam árabe, inactividad sospechosa ni intrusos.

━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`[⚠️ ADVERTENCIA ${advertencias}/3] ${numero}`);
      }

      return false;
    }

    return true;

  } catch (e) {
    console.error('[❌ ERROR EN SISTEMA ANTI-ARABES CYBERCORE]', e);
    return true;
  }
}