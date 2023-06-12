exports.run = {
   usage: ['مكس'],
   hidden: ['ايموجي-مكس', 'خلط'],
   use: 'ايموجي + ايموجي',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         let exif = global.db.setting
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, '😳+😩'), m)
         let [emo1, emo2] = text.split`+`
         if (!emo1 || !emo2) return client.reply(m.chat, Func.texted('bold', `🚩 اختر 2 ايموجيات ليتم خلطهم في الخلااااط.`), m)
         let json = await Api.emojimix(emo1 + '_' + emo2)
         if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 وه ايموجيات مايمكن خلطهم.`), m)
         await client.sendSticker(m.chat, await Func.fetchBuffer(json.data.url), m, {
            packname: exif.sk_pack,
            author: exif.sk_author,
            categories: [emo1, emo2]
         })
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}