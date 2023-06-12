const gtts = require('node-gtts')
const { tmpdir } = require('os')
const fs = require('fs')
const path = require('path')
exports.run = {
   usage: ['انطق'],
   use: '<اكتب نص>',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'love you'), m)
      if (text && m.quoted && m.quoted.text) {
         let lang = text.slice(0, 2)
         try {
            let data = m.quoted.text
            let tts = gtts(lang)
            let filePath = path.join(tmpdir(), Func.filename('mp3'))
            tts.save(filePath, data, async () => {
               client.sendFile(m.chat, await Func.fetchBuffer(filePath), 'audio.mp3', '', m)
               fs.unlinkSync(filePath)
            })
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 اللغة غير مدعومة من قبل الفويسات في البوت.`), m)
         }
      } else if (text) {
         let lang = text.slice(0, 2)
         try {
            let data = text.substring(2).trim()
            let tts = gtts(lang)
            let filePath = path.join(tmpdir(), Func.filename('mp3'))
            tts.save(filePath, data, async () => {
               client.sendFile(m.chat, await Func.fetchBuffer(filePath), 'audio.mp3', '', m)
               fs.unlinkSync(filePath)
            })
         } catch (e) {
            console.log(e)
            return client.reply(m.chat, Func.texted('bold', `🚩 لغة غير مدعومة في فويسات البوت.`), m)
         }
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}