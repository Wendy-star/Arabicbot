exports.run = {
   usage: ['مسح'],
   hidden: ['حذف'],
   use: '<رد ع رسالة البوت>',
   category: 'special',
   async: async (m, {
      client,
      isBotAdmin
   }) => {
      if (!m.quoted) return
      client.sendMessage(m.chat, {
         delete: {
            remoteJid: m.chat,
            fromMe: isBotAdmin ? false : true,
            id: m.quoted.id,
            participant: m.quoted.sender
         }
      })
   },
   error: false,
   group: true
}