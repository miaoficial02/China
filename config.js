import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 525218138672

//*──ׄ✞ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.owner = [
  ['522219831926', '🜲 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 👻', true],
  ['573142495895'],
  ['50248019799'], // Espacio 1
  [''], // Espacio 2
  ['']  // Espacio 3
];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['522219831926'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩'
global.sessions = 'VLADILENASession'
global.jadi = 'VLADILENAJadiBot'
global.blackJadibts = true

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.packsticker = `
╭───💗『 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 』💗───╮
┃ 👑 𝙱𝙾𝚃 𝙾𝙵𝙸𝙲𝙸𝙰𝙻: 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩
┃ 🧠 𝙋𝚘𝚍𝚎𝚛, 𝚍𝚒𝚜𝚎ñ𝚘 𝚢 𝚌𝚘𝚚𝚞𝚎𝚝𝚎𝚛í𝚊
┃ 💋 𝙲𝚘𝚗𝚝𝚎𝚗𝚒𝚍𝚘 +18, 𝚁𝙿𝙶, 𝚓𝚞𝚎𝚐𝚘𝚜 𝚢 𝚖á𝚜
┃ 🎧 𝙈𝚞𝚜𝚒𝚌𝚊, 𝚂𝚝𝚒𝚌𝚔𝚎𝚛𝚜, 𝙶𝙿𝚃, 𝙼𝚎𝚗ú𝚜...
┃ ✨ 𝙵𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚎𝚗 𝙶𝚛𝚞𝚙𝚘𝚜 𝚢 𝙿𝚛𝚒𝚟𝚊𝚍𝚘
┃ 🧸 𝙴𝚜𝚝𝚎 𝚋𝚘𝚝 𝚝𝚎 𝚊𝚖𝚊, 𝚙𝚞𝚎𝚍𝚎 𝚖𝚊𝚝𝚊𝚛 𝚙𝚘𝚛 𝚝𝚒 💅
┃ 💖 𝘾𝙍𝙀𝘼𝘿𝙊𝙍: 👑 David Oficial
╰───────🍓 𝙏𝙪 𝙘𝙤𝙘𝙝𝙞𝙣𝙖 𝙙𝙞𝙫𝙞𝙣𝙖 🍓───────╯ᚲ`;

global.packname = `✠ 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩☘ `;
global.author = `
⇝ 📆 ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}
⇝ ⏰ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}
♾━━━━━━━━━━━━━━━♾`;

global.wm = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 ☘';
global.titulowm = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩';
global.igfg = 'ᥫDavid Oficial'
global.botname = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ David Oficial ⚡'
global.textbot = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩  : David Chan'
global.gt = '͟͞𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 ☘͟͞';
global.namechannel = '𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 /David Chan'

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.moneda = 'yenes'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 ™◞ • 🌿
global.gp4 = 'https://chat.whatsapp.com/KqPIhaVSwKr9QsD6SnmFyH' //Grupo Oficial De 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 𝘽𝙤𝙩 
global.gp1 = 'https://chat.whatsapp.com/KqPIhaVSwKr9QsD6SnmFyH' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/KqPIhaVSwKr9QsD6SnmFyH'//
global.channel = 'https://whatsapp.com/channel/0029VbBDvKDL7UVS1oMqgu35' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029VbBDvKDL7UVS1oMqgu35' //Canal test 
global.yt = 'https://www.youtube.com/' //Canal De Youtube
global.md = 'https://github.com/TOKIO5025/VLADILENA-BOT' //Github Oficial
global.correo = ''
global.cn ='https://whatsapp.com/channel/0029VbBDvKDL7UVS1oMqgu35';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363402551095141@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
