const handler = async (m, { conn, text }) => {
  const [numero, mensaje, cantidad] = text.split('|');

  if (!numero || !mensaje)
    return conn.reply(
      m.chat,
      `👀 *Uso correcto, tontito...*\n\n*🚩 #spamwa número|mensaje|cantidad*\n\n> Ej: *#spamwa 50212345678|Hola bebé 😘|10*`,
      m, rcanal
    );

  if (cantidad && isNaN(cantidad))
    return conn.reply(m.chat, '😒 *¿Eso es un número?*\n\n👉 La cantidad debe ser un número válido, wey.', m, rcanal);

  const target = numero.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^0/, '62') + '@s.whatsapp.net';
  const veces = cantidad ? parseInt(cantidad) : 10;

  if (veces > 999)
    return conn.reply(m.chat, '❌ *¿Más de 999? Bájale dos rayitas, crack...*\n\nMáximo permitido: *999*', m, rcanal);

  await conn.reply(m.chat, `💥 *Hinata Bot desatando el spam*\n\n📨 Mensaje: ${mensaje}\n👤 Número: ${numero}\n🔁 Veces: ${veces}`, m, rcanal);

  for (let i = 0; i < veces; i++) {
    await conn.reply(target, mensaje.trim(), null);
    await new Promise(res => setTimeout(res, 500)); // retrasa un poco para evitar bloqueos
  }

  await m.react('✅');
};

handler.help = ['spamwa <número>|<mensaje>|<cantidad>'];
handler.tags = ['tools'];
handler.command = ['spam', 'spamwa'];
handler.premium = true;

export default handler;