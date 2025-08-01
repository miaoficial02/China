import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('⛔ No se pudo cargar el archivo *characters.json*, ¿acaso eres tont@?')
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

let handler = async (m, { conn, command, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, `💢 *Hinata te dice...*\n\nEscribe el nombre del personaje, no soy adivina mi ciela.\n\n📌 Ejemplo: *.wvideo hinata*`, m)
        return
    }

    const characterName = args.join(' ').toLowerCase().trim()

    try {
        const characters = await loadCharacters()
        const character = characters.find(c => c.name.toLowerCase() === characterName)

        if (!character) {
            await conn.reply(m.chat, `🚫 *Personaje no encontrado:*\nNo encontré a *${characterName}* en mi harem, tal vez escribiste mal el nombre o no está agregado aún.`, m)
            return
        }

        if (!character.vid || character.vid.length === 0) {
            await conn.reply(m.chat, `📵 *Ups...*\n*${character.name}* no tiene ningún video subido aún. Qué triste ¿no?`, m)
            return
        }

        const randomVideo = character.vid[Math.floor(Math.random() * character.vid.length)]
        const message = `🌸 *${character.name}*\n⚧️ Género: *${character.gender}*\n🎬 Origen: *${character.source}*\n\n💋 Disfruta tu dosis de waifu!`

        const sendAsGif = Math.random() < 0.5

        await conn.sendMessage(m.chat, {
            video: { url: randomVideo },
            gifPlayback: sendAsGif,
            caption: message
        }, { quoted: m })

    } catch (error) {
        await conn.reply(m.chat, `💥 *Error inesperado:*\n${error.message}`, m)
    }
}

handler.help = ['wvideo <nombre>']
handler.tags = ['anime']
handler.command = ['charvideo', 'wvideo', 'waifuvideo']
handler.group = true

export default handler