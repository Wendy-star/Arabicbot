exports.run = {
   usage: ['ستيكر'],
   hidden: ['ستكر', 'ملصق', 'الستيكر', 'الملصق'],
   use: '<سوي رد ع صورة أو فيديو>',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         let exif = global.db.setting
         if (text) {
            // if (m.isGroup) return client.reply(m.chat, global.status.private, m)
            let json = await Api.sticker(text)
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            client.sendReact(m.chat, '🕒', m.key)
            if (text.match('getstickerpack.com')) {
               for (let i = 0; i < json.data.length; i++) {
                  client.sendSticker(m.chat, await Func.fetchBuffer(json.data[i].url), m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
                  await Func.delay(2000)
               }
               await client.reply(m.chat, Func.texted('bold', `✅ تم تحويل كل الملصقات.`), m)
            } else {
               let rows = []
               json.data.map(async (v, i) => {
                  rows.push({
                     title: v.name,
                     rowId: `${isPrefix + command} ${v.url}`,
                     description: ``
                  })
               })
               client.sendList(m.chat, '', `هذا بحث المخصص : “${text}”, اختر الي تبي تحوله. 🍟`, '', 'اضغط!', [{
                  rows
               }], m)
            }
         } else {
            if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
               let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
               let q = m.quoted ? m.quoted.message[type] : m.msg
               let img = await client.downloadMediaMessage(q)
               if (/video/.test(type)) {
                  if (q.seconds > 10) return client.reply(m.chat, Func.texted('bold', `🚩 المفروض الفيديو مايتجاوز ال١٠ ثواني عشان يصير ملصق.`), m)
                  return await client.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               } else if (/image/.test(type)) {
                  return await client.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               }
            } else {
               let q = m.quoted ? m.quoted : m
               let mime = (q.msg || q).mimetype || ''
               if (/image\/(jpe?g|png)/.test(mime)) {
                  let img = await q.download()
                  if (!img) return client.reply(m.chat, global.status.wrong, m)
                  return await client.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               } else if (/video/.test(mime)) {
                  if ((q.msg || q).seconds > 10) return client.reply(m.chat, Func.texted('bold', `🚩 جب فيديو اقل من ١٠ ثواني`), m)
                  let img = await q.download()
                  if (!img) return client.reply(m.chat, global.status.wrong, m)
                  return await client.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               } else client.reply(m.chat, Func.texted('bold', `توثر ??`), m)
            }
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false
}