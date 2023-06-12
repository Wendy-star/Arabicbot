exports.run = {
   async: async (m, {
      client,
      users,
      chats,
      isAdmin,
      isBotAdmin,
      isOwner,
      groupSet
   }) => {
      try {
         let unban = new Date(users.banTemp + global.timer)
         if (new Date - users.banTemp > global.timer) {
            if (!users.banned && !m.fromMe) {
               users.spam += 1
               let spam = users.spam
               if (spam >= 2) setTimeout(() => {
                  users.spam = 0
               }, global.cooldown * 1000)
               if (users.banTimes >= 3) return client.reply(m.chat, `🚩 يخوي لا تسوي سبام رسايل في ٣ ثواني عشان لا يتم حظرك من البوت.`, m).then(() => {
                  users.banned = true
                  users.banTemp = 0
                  users.banTimes = 0
               })
               if (m.isGroup && spam == 4) return client.reply(m.chat, `🚩 رصد نظامنا انك تسوي سبام انتظر *${global.cooldown} ثانية*.`, m)
               if (m.isGroup && spam >= 5) return client.reply(m.chat, `🚩 لقد تم حظرك من البوت لمدة ${((global.timer / 1000) / 60)} دقيقة لأنك تسوي سبام.`, m).then(() => {
                  users.banTemp = new Date() * 1
                  users.banTimes += 1
                  if (!isOwner && chats) {
                     if (new Date() * 1 - chats.command > global.cooldown * 1000) {
                        chats.command = new Date() * 1
                     } else {
                        if (!m.fromMe) return
                     }
                  }
               })
               if (!m.isGroup && spam == 4) return client.reply(m.chat, `🚩 هدى لا تسوي سبام لمدة *${global.cooldown} ثانية*.`, m)
               if (!m.isGroup && spam >= 5) return client.reply(m.chat, `🚩 لقد تم حظرك من البوت لمدة ${((global.timer / 1000) / 60)} دقيقة لأنك تسبم.`, m).then(() => {
                  users.banTemp = new Date() * 1
                  users.banTimes += 1
               })
            }
         } else return
      } catch (e) {
         // return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}