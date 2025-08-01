let handler = async (m, { text, usedPrefix, command }) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const regex = /^([a-zA-Z??\s]+)\.(\d{1,2})$/i
  const user = global.db.data.users[m.sender]

  if (user.registered) {
    return m.reply(`? Ya est¨¢s registrado, guap@...\nVe tu perfil con *${usedPrefix}perfil*, mimos@.`)
  }

  if (!regex.test(text)) {
    return m.reply(`? Formato inv¨¢lido, ternurita. Usa:\n*${usedPrefix + command} Nombre.Edad*\n\n? Ejemplo:\n*${usedPrefix + command} Hinata.21*`)
  }

  let [_, name, age] = text.match(regex)
  age = parseInt(age)

  if (age < 5 || age > 100) {
    return m.reply(`? Edad no v¨¢lida, bbsita. Tiene que ser entre *5 y 100 a?os*, no seas loca.`)
  }

  const generos = ['Masculino', 'Femenino', 'No binario']
  const reinos = ['? Fuego Infernal', '? Gotas Malditas', '?? Sombra Susurrante', '? Truenos del Caos']
  const afinidades = ['? Fuego', '? Agua', '?? Viento', '? Tierra', '? Rayo', '? Oscuridad', '? Luz']

  const gender = generos[Math.floor(Math.random() * generos.length)]
  const reino = reinos[Math.floor(Math.random() * reinos.length)]
  const afinidad = afinidades[Math.floor(Math.random() * afinidades.length)]
  const nivelMagico = Math.floor(Math.random() * 10) + 1

  user.name = name.trim()
  user.age = age
  user.gender = gender
  user.country = reino
  user.registered = true
  user.regTime = +new Date()
  user.afinidad = afinidad
  user.nivelMagico = nivelMagico

  await m.reply(`? *El man¨¢ te reconoce, ${name.toUpperCase()}... algo poderoso despierta...*`)
  await delay(1000)

  await m.reply(`? ?????? ?????????? ?
? Nombre: *${name.trim()}*
? G¨¦nero: *${gender}*
? Edad: *${age}*
? Afinidad m¨¢gica: *${afinidad}*
? Nivel M¨¢gico: *${nivelMagico}*
? Reino: *${reino}*`)
  await delay(1000)

  await m.reply(`? *Tu alma ha sido marcada... y ahora formas parte del caos m¨¢gico, mi ciela.* ?`)
  await m.react('?')
}

handler.command = ['reg', 'register', 'registrar']
export default handler