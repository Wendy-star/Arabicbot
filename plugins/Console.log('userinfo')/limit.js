exports.run = {
   usage: ['حدود'],
   category: 'user info',
   async: async (m, {
      client,
      isPrefix,
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return client.reply(m.chat, `🚩 لقد انتهت عدد مرات استخدامك للبوت انتظر إلى الساعة 00.00 و سوف يتم إعادة تعبئتهم\n\n للحصول على المزيد المرجوا التوجه للمطور*`, m)
      client.reply(m.chat, `🦄 حدود استخدامك المتبقية : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\n  للحصول على المزيد المرجوا ان تكون من النخبة، اذا تبي تفهم اكثر ارسل *${isPrefix}النخبة*` : ''}`, m)
   },
   error: false
}