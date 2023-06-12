exports.run = {
   usage: ['مخفي'],
   use: '<النص>',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      participants
   }) => {
      let users = participants.map(u => u.id)
      await client.reply(m.chat, text, null, {
         mentions: users
      })
   },
   admin: true,
   group: true,
   premium: true
}