exports.run = {
   usage: ['النخبة'],
   category: 'special',
   async: async (m, {
      client,
      isPrefix
   }) => {
      client.reply(m.chat, `🏷️ تبي تصير من النخبة؟ بس بـ٢٠ ريال سعودي أو ٥ دولار للشهر\n\nاذا تبي تشتري توجه للمطور، استعمل ذا الأمر : *${isPrefix}المطور*`, m)
   },
   error: false,
   cache: true,
   location: __filename
}