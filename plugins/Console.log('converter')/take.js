exports.run = {
   usage: ['زرف'],
   hidden: ['حقوق'],
   use: '<حقوقك | حقوقك>',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.texted('bold', `🚩 عطي نص نحطه حقوق للملصق.`), m)
         let [packname, ...author] = text.split`|`
         author = (author || []).join`|`
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!/webp/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 سوي رد ع الملصق الي تبيني ازرفه و اغير حقوقه.`), m)
         let img = await q.download()
         if (!img) return client.reply(m.chat, global.status.wrong, m)
         client.sendSticker(m.chat, img, m, {
            packname: packname || '',
            author: author || ''
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}