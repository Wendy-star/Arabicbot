exports.run = {
   usage: ['اضافة', 'رفع', 'تخفيض', 'طرد'],
   use: '<منشن أو رد>',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      participants
   }) => {
      let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
      if (!input) return client.reply(m.chat, Func.texted('bold', `🚩 منشن او سوي ريبلاي ع رسالة الشخص.`), m)
      let p = await client.onWhatsApp(input.trim())
      if (p.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 رقم غلط.`), m)
      let jid = client.decodeJid(p[0].jid)
      let number = jid.replace(/@.+/, '')
      if (command == 'طرد') {
         let member = participants.find(u => u.id == jid)
         if (!member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} هو بالفعل مطرود او غادر المجموعة.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'remove').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'اضافة') {
         // if (!isOwner) return client.reply(m.chat, global.status.owner, m)
         let member = participants.find(u => u.id == jid)
         if (member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} موجود بالفعل في المجموعة.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'add').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'تخفيض') {
         let member = participants.find(u => u.id == jid)
         if (!member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} الرقم أو الشخص مب موجود بالقروب`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'demote').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'رفع') {
         let member = participants.find(u => u.id == jid)
         if (!member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} الرقم أو الشخص مب موجود بالقروب اصلا.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'رفع').then(res => m.reply(Func.jsonFormat(res)))
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}