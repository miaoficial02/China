//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    
    // Verificamos si se menciona a alguien o se cita un mensaje
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; // Si hay mención, usamos esa
    } else if (m.quoted) {
        who = m.quoted.sender; // Si se cita un mensaje, usamos el emisor de ese mensaje
    } else {
        who = m.sender; // En caso contrario, usamos el emisor
    }

    let name = conn.getName(who); // Nombre de la persona mencionada o del emisor
    let name2 = conn.getName(m.sender); // Nombre del usuario que envía el comando
    m.react('🏳️‍🌈');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` beso excitantemente a \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` beso apasionado a \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se besa asi mismo por qué es un rolo e gay`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/bLLe.mp4'; 
        let pp2 = 'https://qu.ax/mwXW.mp4'; 
        let pp3 = 'https://qu.ax/WUiG.mp4';
        let pp4 = 'https://qu.ax/djk.mp4';
        let pp5 = 'https://qu.ax/xdis.mp4';
        let pp6 = 'https://qu.ax/JKEw.mp4';
        let pp7 = 'https://qu.ax/eCmG.mp4';
        let pp8 = 'https://qu.ax/Rtaw.mp4';
        let pp9 = 'https://qu.ax/Esky.mp4';
        let pp10 = 'https://qu.ax/AYoP.mp4';
        let pp11 = 'https://qu.ax/ulK.mp4';
        let pp12 = 'https://qu.ax/xgVd.mp4';
        let pp13 = 'https://qu.ax/gchC.mp4';
        let pp14 = 'https://qu.ax/DSbr.mp4';
        let pp15 = 'https://qu.ax/duCR.mp4';
        let pp16 = 'https://qu.ax/aHmt.mp4';
        let pp17 = 'https://qu.ax/BmUb.mp4';
        let pp18 = 'https://qu.ax/lBqZ.mp4';
        let pp19 = 'https://qu.ax/LcxW.mp4';
        let pp20 = 'https://qu.ax/MacM.mp4';
        let pp21 = 'https://qu.ax/vwbX.mp4';
        let pp22 = 'https://qu.ax/hnzN.mp4';
        let pp23 = 'https://qu.ax/hqZa.mp4';
        let pp24 = 'https://qu.ax/WUE.mp4';
                
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15, pp16, pp17, pp18, pp19, pp20, pp21, pp22, pp23, pp24];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['kiss2/besar2 @tag'];
handler.tags = ['emox'];
handler.command = ['kiss2','besar2'];
handler.group = true;

export default handler;