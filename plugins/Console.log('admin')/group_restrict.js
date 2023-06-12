exports.run = {
   usage: ['الشات'],
   use: 'فتح / قفل',
   category: 'admin tools',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `🚩 اختار *قفل* أو *فتح* المجموعة.`), m)
      if (args[0] == 'فتح') {
         await client.groupSettingUpdate(m.chat, 'not_announcement')
      } else if (args[0] == 'قفل') {
         await client.groupSettingUpdate(m.chat, 'announcement')
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}