const impuesto = 0.02;

let handler = async (m, { conn, text }) => {
  let who = m.mentionedJid?.[0];
  if (!who) throw '📛 *Menciona al usuario al que quieres transferir, weon.*\n📌 Ejemplo: *@usuario 500*';

  let cantidadTexto = text.replace('@' + who.split`@`[0], '').trim();
  if (!cantidadTexto) throw '💸 *Escribe cuánto vas a transferir, avaricioso.*';
  if (isNaN(cantidadTexto)) throw '❌ *Solo números, bruto.*';

  let monto = parseInt(cantidadTexto);
  if (monto <= 0) throw '🖕 *La cantidad tiene que ser mayor que cero, rata.*';

  let impuestoCobrado = Math.ceil(monto * impuesto);
  let total = monto + impuestoCobrado;

  let sender = m.sender;
  let userSender = global.db.data.users[sender];
  let userReceiver = global.db.data.users[who];

  if (!userSender || !userReceiver) throw '❌ *Uno de los dos no está registrado, pendejo.*';
  if (userSender.cookies < total)
    throw `😒 *No tienes tanto, miserable.*\n🪙 Tienes: *${userSender.cookies.toLocaleString()}*\n💰 Necesitas: *${total.toLocaleString()}* (incluye impuesto del 2%)`;

  userSender.cookies -= total;
  userReceiver.cookies += monto;

  await m.reply(
    `✅ *Transferencia exitosa, mi ciela.*  
💸 Le diste *${monto.toLocaleString()} monedas 🪙* a @${who.split('@')[0]}  
🧾 *Impuesto de Hinata (2%)*: *${impuestoCobrado.toLocaleString()} monedas*  
📉 *Total descontado de tu miserable cuenta*: *${total.toLocaleString()} monedas*`,
    null,
    { mentions: [who] }
  );

  conn.fakeReply(
    m.chat,
    `💌 *@${sender.split('@')[0]} te mandó *${monto.toLocaleString()} monedas 🪙*.\nNo olvides agradecerle, perra.*`,
    who,
    m.text
  );
};

handler.help = ['transferir *@usuario cantidad*'];
handler.tags = ['economia', 'rpg'];
handler.command = ['transferir', 'enviar', 'dar'];
handler.register = true;

export default handler;