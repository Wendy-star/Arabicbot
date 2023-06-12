exports.run = {
   usage: ['القوانين', 'السكربت'],
   hidden: ['بوت'],
   category: 'special',
   async: async (m, {
      client,
      args,
      command
   }) => {
      if (command == 'السكربت' || command == 'بوت') return client.reply(m.chat, info(), m)
      if (command == 'القوانين') return client.sendMessageModify(m.chat, tnc(), m, {
         largeThumb: true
      })
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `بوت فوجي تم تطويره بواسطة فريق *Arena*.
   
CMD :
- https://chat.whatsapp.com/EFatuIRz1Lg2PJ9U2tAAnZ`
}

const tnc = () => {
   return `*⬅ ممنوع السبام و تكرار الأوامر*

*⬅ الحدود يتم إعادة تعبئتها كل 12 ساعة، عدد الحدود اليومية : ${global.limit}*

*⬅ ممنوع الاتصال برقم البوت إطلاقا او سوف يتم حظرك*

*⬅ ممنوع ازعاج المطور بأي شكل من الأشكال إن لم يكن كلامك مفيد*

*⬅ ممنوع السب او القذف او سوف يتم وضعك في القائمة السوداء*

*⬅ ممنوع استخدام الأوامر في اشياء لا ترضي الله او اشياء +18 او سوف يتم حظرك*

*⬅ اذا تبي تفك حظرك من البوت توجه للمطور*


*❏   كل الحقوق محفوظة لصالح فريق Arena و يمنع بانا التعديل في الحقوق او اي شيء في البوت الا بعد سماح المطور لك   ❏.*`
}