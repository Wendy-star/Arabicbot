const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
exports.run = {
   usage: ['معلومات-المجموعة'],
   hidden: ['معلومات'],
   category: 'special',
   async: async (m, {
      client,
      participants
   }) => {
      try {
         let setting = global.db.groups.find(v => v.jid == m.chat)
         let pic = await Func.fetchBuffer('./media/image/default.jpg')
         let meta = await (await client.groupMetadata(m.chat))
         let admin = await client.groupAdmin(m.chat)
         let member = participants.map(u => u.id)
         try {
            pic = await Func.fetchBuffer(await client.profilePictureUrl(m.chat, 'image'))
         } catch {} finally {
            let caption = `乂  *معلومات - المجموعة*  乂\n\n`
            caption += `	❒  *الاسم* : ${meta.subject}\n`
            caption += `	❒  *عدد الأعضاء* : ${member.length}\n`
            caption += `	❒  *عدد المشرفين* : ${admin.length}\n`
            caption += `	❒  *الانشاء* : ${moment(meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}\n`
            caption += `	❒  *المؤسس* : ${meta.owner ? '@' + meta.owner.split('@')[0] : m.chat.match('-') ? '@' + m.chat.split('-')[0] : ''}\n\n`
            
            caption += global.footer
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: pic,
            })
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true,
   cache: true,
   location: __filename
}