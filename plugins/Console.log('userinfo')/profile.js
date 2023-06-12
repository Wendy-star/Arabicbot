exports.run = {
   usage: ['كشف'],
   use: '<منشن أو سوي رد>',
   category: 'user info',
   async: async (m, {
      client,
      text,
      isPrefix,
      blockList
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 منشن الشخص او سوي رد ع رسايله.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🚩 شخص غلط.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🚩 مايمكن لا تسألني ليه.`), m)
      let pic = await Func.fetchBuffer('./media/image/default.jpg')
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let target = global.db.users.find(v => v.jid == user)
         if (typeof target == 'undefined') return client.reply(m.chat, Func.texted('bold', `🚩 اما ماقدرت اجيب معلوماته سالفته ذا.`), m)
         try {
            pic = await Func.fetchBuffer(await client.profilePictureUrl(user, 'image'))
         } catch (e) {} finally {
            let blocked = blockList.includes(user) ? true : false
            let now = new Date() * 1
            let lastseen = (target.lastseen == 0) ? 'Never' : Func.toDate(now - target.lastseen)
            let usebot = (target.usebot == 0) ? 'Never' : Func.toDate(now - target.usebot)
            let caption = `✧  *معلومات - المستخدم*  ✧\n\n`
            caption += `	❏ *الحدود* : ${Func.formatNumber(target.limit)}\n`
            caption += `	❏ *الحلب* : ${Func.formatNumber(target.hit)}\n`
            caption += `	❏ *الانذارات* : ${((m.isGroup) ? (typeof global.db.groups.find(v => v.jid == m.chat).member[user] != 'undefined' ? global.db.groups.find(v => v.jid == m.chat).member[user].warning : 0) + ' / 5' : target.warning + ' / 5')}\n\n`
            caption += `✧  *حالة - المستخدم*  ✧\n\n`
            caption += `	❏ *محظور* : ${(blocked ? '✅' : '❌')}\n`
            caption += `	❏ *مبند* : ${(new Date - target.banTemp < global.timer) ? Func.toTime(new Date(target.banTemp + global.timer) - new Date()) + ' (' + ((global.timer / 1000) / 60) + ' min)' : target.banned ? '✅' : '❌'}\n`
            caption += `	❏ *استعمل في الخاص* : ${(global.db.chats.map(v => v.jid).includes(user) ? '✅' : '❌')}\n`
            caption += `	❏ *النخبة* : ${(target.premium ? '✅' : '❌')}\n`
            caption += `	❏ *الاسكبراد* : ${target.expired == 0 ? '❕' : Func.timeReverse(target.expired - new Date() * 1)}\n\n`
            caption += global.footer
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: pic
            })
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}