exports.run = {
   usage: ['المطور'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'المطور و الصانع'
      }], m, {
         org: '@nm9h',
         website: 'WA.me/212609395104',
         email: 'v.i3@aol.com'
      })
   },
   error: false,
   cache: true,
   location: __filename
}