exports.run = {
   async: async (m, {
      client,
      body,
      users
   }) => {
      try {
         let afk = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
         for (let jid of afk) {
            let is_user = global.db.users.find(v => v.jid == jid)
            if (!is_user) continue
            let afkTime = is_user.afk
            if (!afkTime || afkTime < 0) continue
            let reason = is_user.afkReason || ''
            if (!m.fromMe) {
               client.reply(m.chat, `*اخونا في الله في حالة نوم * : @${jid.split('@')[0]}\n• *السبب* : ${reason ? reason : '-'}\n• *المدة* : [ ${Func.toTime(new Date - afkTime)} ]`, m).then(async () => {
                  client.reply(jid, `شخص ما من *${await (await client.groupMetadata(m.chat)).subject}*' , سوا لك رد أو منشنك.\n\n• *الشخص* : @${m.sender.split('@')[0]}`, m).then(async () => {
                     await client.copyNForward(jid, m)
                  })
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}