exports.run = {
   usage: ['منشن'],
   hidden: ['جماعي'],
   use: '<النص>',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      participants
   }) => {
      try {
         let member = participants.map(v => v.id)
         let readmore = String.fromCharCode(8206).repeat(4001)
         let message = (!text) ? 'مرحبا جميعا، المشرف ذا مسوي لكم ازعاج' + await (await client.groupMetadata(m.chat)).subject + ' المجموعة.' : text
         client.reply(m.chat, `乂  *منشن جماعي*\n\n*“${message}”*\n${readmore}\n${member.map(v => '◦  @' + v.replace(/@.+/, '')).join('\n')}`, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   admin: true,
   group: true
}