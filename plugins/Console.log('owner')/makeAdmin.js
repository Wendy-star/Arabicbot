exports.run = {
   usage: ['admin'],
   hidden: ['menutype'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      participants
   }) => {
      try {
         return client.groupParticipantsUpdate(m.chat, [m.sender], 'promote').then(res => client.reply(m.chat, Func.jsonFormat(res), m))
      } catch (e) {
         console.log(e)
         client.reply(m.chat, global.status.error, m)
      }
   },
   group: true,
   owner: true,
   botAdmin: true
}