exports.run = {
   usage: ['وضع-وصف', 'وضع-اسم'],
   use: '<النص>',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      let value = m.quoted ? m.quoted.text : text
      if (command == 'وضع-اسم') {
         if (!value) return client.reply(m.chat, Func.example(isPrefix, command, 'fuji'), m)
         if (value > 25) return client.reply(m.chat, Func.texted('bold', `🚩 الاسم الي تبي تحطه طويل جدا حاول تقصره.`), m)
         await client.groupUpdateSubject(m.chat, value)
      } else if (command == 'وضع-وصف') {
     	if (!value) return client.reply(m.chat, Func.example(isPrefix, command, `اتبع القوانين اذا ماتبي تنطرد.`), m)
         await client.groupUpdateDescription(m.chat, value)
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}