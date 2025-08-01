import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('💔 Ay mi cielo... no pude leer tu archivo de waifus, qué tragedia 😿');
    }
}

let handler = async (m, { conn, args }) => {
    try {
        const characters = await loadCharacters();
        const page = parseInt(args[0]) || 1;
        const itemsPerPage = 10;
        const sortedCharacters = characters.sort((a, b) => Number(b.value) - Number(a.value));

        const totalCharacters = sortedCharacters.length;
        const totalPages = Math.ceil(totalCharacters / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const charactersToShow = sortedCharacters.slice(startIndex, endIndex);

        let message = `💋 *RANKING DE PUTIWAIKUS CON MÁS VALOR, BEBÉ:*\n\n`;
        charactersToShow.forEach((character, index) => {
            message += `🍑 *#${startIndex + index + 1}* - _${character.name}_\n`;
            message += ` 🎀 Valor: *${character.value}*\n\n`;
        });

        message += `📑 Página *${page}* de *${totalPages}*\n`;
        message += `✨ Usa *.topwaifus ${page + 1}* para la siguiente, sabroso~`;

        await conn.reply(m.chat, message, m);
    } catch (error) {
        await conn.reply(m.chat, `🧨 Oops mi amor... fallé como tu ex: *${error.message}*`, m);
    }
};

handler.help = ['topwaifus [página]'];
handler.tags = ['anime'];
handler.command = ['topwaifus', 'waifustop', 'waifusboard'];
handler.group = true;
handler.register = true;

export default handler;