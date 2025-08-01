import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const cooldowns = {};

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('💋 No pude leer el archivo de waifus, nene.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('💅 No pude guardar los datos, algo se me cayó del tacón.');
    }
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return await conn.reply(
            m.chat,
            `👠 Tranquilo, perrito caliente 🐕‍🔥\nDebes esperar *${minutes}m ${seconds}s* para volver a *reclamar a una waifu* 😈`,
            m
        );
    }

    if (m.quoted && m.quoted.sender === conn.user.jid) {
        try {
            const characters = await loadCharacters();
            const characterIdMatch = m.quoted.text.match(/✦ ID: \*(.+?)\*/);

            if (!characterIdMatch) {
                return conn.reply(m.chat, '😒 ¿Y esa cita qué? No le veo ID válido, bebé.', m);
            }

            const characterId = characterIdMatch[1];
            const character = characters.find(c => c.id === characterId);

            if (!character) {
                return conn.reply(m.chat, '👀 Esa waifu ya se escapó del catálogo, intenta con otra, sexy.', m);
            }

            if (character.user && character.user !== userId) {
                return conn.reply(
                    m.chat,
                    `💔 Ayyy no, esta ya fue *reclamada* por @${character.user.split('@')[0]}... Busca otra calentura 😘`,
                    m,
                    { mentions: [character.user] }
                );
            }

            character.user = userId;
            character.status = '🔥 Reclamada por un papi 🔥';

            await saveCharacters(characters);

            await conn.reply(
                m.chat,
                `💘 *${character.name}* ahora es *tuyita*, suertudo 🫦\n\n💋 Cuídala bien o te la quito~`,
                m
            );

            cooldowns[userId] = now + 30 * 60 * 1000;
        } catch (error) {
            await conn.reply(m.chat, `🚨 Ocurrió un drama: ${error.message}`, m);
        }
    } else {
        await conn.reply(m.chat, '😤 Oye, tienes que *citar a una waifu* si la quieres reclamar, bruto.', m);
    }
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim', 'reclamar'];
handler.group = true;

export default handler;