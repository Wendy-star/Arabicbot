exports.run = {
   usage: ['نوم'],
   use: '<حط السبب>',
   category: 'special',
   async: async (m, {
      client,
      text
   }) => {
      try {
         let user = global.db.users.find(v => v.jid == m.sender)
         user.afk = +new Date
         user.afkReason = text
         let tag = m.sender.split`@` [0]
         return client.reply(m.chat, Func.texted('bold', `🚩 @${tag} انت في وضع النوم!`), m)
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   group: true
}