import translate from '@vitalets/google-translate-api'
import axios from 'axios'

const handler = (m) => m

handler.before = async function (m) {
  const chat = global.db.data.chats[m.chat]
  if (!chat?.simi) return true

  // Evitar comandos que no queremos procesar con simi
  const blacklist = [
    'false', 'disnable', 'disable', 'turnoff', 'turn off', '0',
    'serbot', 'bots', 'jadibot', 'sockets', 'menu', 'update', 
    'play', 'play2', 'playdoc', 'tiktok', 'facebook',
    'menu2', 'infobot', 'estado', 'ping', 'sc', 'sticker', 's', 'wm', 'qc'
  ]
  if (blacklist.some(word => new RegExp(word, 'i').test(m.text))) return true

  try {
    const response = await simitalk(m.text)
    if (response.status) {
      await this.reply(m.chat, response.resultado.simsimi, m)
    } else {
      throw new Error(response.resultado.msg)
    }
  } catch (e) {
    throw '🍟 *Ocurrió un error con Simsimi, intenta más tarde.*'
  }

  return false
}

export default handler

async function simitalk(ask, apikey = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
  if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." } }
  
  try {
    const res = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`)
    let translated = await translate(res.data.data.message, { to: language, autoCorrect: true })
    if (!translated.text || translated.text.toLowerCase() === 'indefinida' || !res.data) {
      throw new Error('Texto indefinido para forzar segunda API')
    }
    return { status: true, resultado: { simsimi: translated.text } }
  } catch {
    try {
      const res2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikey}&ask=${encodeURIComponent(ask)}&lc=${language}`)
      return { status: true, resultado: { simsimi: res2.data.message } }
    } catch (error2) {
      return { status: false, resultado: { msg: "Todas las API's fallaron. Inténtalo más tarde.", error: error2.message } }
    }
  }
}