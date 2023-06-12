const moment = require('moment-timezone')
exports.run = {
   usage: ['الاحصائيات'],
   hidden: ['احصائيات'],
   category: 'special',
   async: async (m, {
      client,
      blockList
   }) => {
      try {
         let users = global.db.users.length
         let chats = global.db.chats.filter(v => v.jid && v.jid.endsWith('.net')).length
         let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
         let groups = await (await groupList()).map(v => v.id).length
         let banned = global.db.users.filter(v => v.banned).length
         let premium = global.db.users.filter(v => v.premium).length
         class Hit extends Array {
            total(key) {
               return this.reduce((a, b) => a + (b[key] || 0), 0)
            }
         }
         let sum = new Hit(...Object.values(global.db.statistic))
         let hitstat = sum.total('hitstat') != 0 ? sum.total('hitstat') : 0
         const stats = {
            users,
            chats,
            groups,
            mimic: (global.db.setting.mimic).length,
            banned,
            blocked: blockList.length,
            premium,
            hitstat,
            uptime: Func.toTime(process.uptime() * 1000)
         }
         const system = global.db.setting
         client.sendMessageModify(m.chat, statistic(stats, system), m, {
            largeThumb: true
         })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}

const statistic = (stats, system) => {
   if (global.db.setting.menuStyle == 3 || global.db.setting.menuStyle == 4) {
      return ` –  *إحصائيات - البوت*

┌  ❏  عدد القروبات ↢ ${Func.texted('bold', Func.formatNumber(stats.groups))} 
│  ❏  الشات بالخاص ↢ ${Func.texted('bold', Func.formatNumber(stats.chats))} 
│  ❏  مستخدمين داتابيس ↢ ${Func.texted('bold', Func.formatNumber(stats.users))} 
│  ❏  عدد المبندين ↢ ${Func.texted('bold', Func.formatNumber(stats.banned))} 
│  ❏  عدد المحظورين ↢ ${Func.texted('bold', Func.formatNumber(stats.blocked))} 
│  ❏  عدد النخبة ↢ ${Func.texted('bold', Func.formatNumber(stats.premium))} 
│  ❏  عدد الأوامر ↢ ${Func.texted('bold', Func.formatNumber(stats.hitstat))} Commands Hit
└  ❏  مدة التشغيل : ${Func.texted('bold', stats.uptime)}

 –  *الـنـظـام*

┌  ❏  ${Func.texted('bold', system.autodownload ? '[ √ ]' : '[ × ]')}  التحميل التلقائي
│  ❏  ${Func.texted('bold', system.chatbot ? '[ √ ]' : '[ × ]')}  الردود الذكية  
│  ❏  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  وضع المجموعة
│  ❏  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  متصل دائما
│  ❏  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  وضع المخصص
│  ❏  الشعار : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
└  ❏  تاريخ التشغيل : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   } else {
      return `乂  *الإحـــصـــائـــيـــات*

	❏  عدد القروبات ↢ ${Func.texted('bold', Func.formatNumber(stats.groups))} 
	❏  الشات بالخاص ↢ ${Func.texted('bold', Func.formatNumber(stats.chats))} 
	❏  عدد الداتابيس ↢ ${Func.texted('bold', Func.formatNumber(stats.users))} 
	❏  عدد المبندين ↢ ${Func.texted('bold', Func.formatNumber(stats.banned))} 
	❏  عدد المحظورين ↢ ${Func.texted('bold', Func.formatNumber(stats.blocked))} 
	❏  عدد النخبة ↢ ${Func.texted('bold', Func.formatNumber(stats.premium))} 
	❏  عدد الأوامر ↢ ${Func.texted('bold', Func.formatNumber(stats.hitstat))} 
	❏  مدة التشغيل : ${Func.texted('bold', stats.uptime)}

乂  *الـنـظـام*

	❏  التحميل التلقائي ↢ ${Func.texted('bold', system.autodownload ? '[ √ ]' : '[ × ]')}  
	❏  الردود الذكية ↢ ${Func.texted('bold', system.chatbot ? '[ √ ]' : '[ × ]')}  
	❏  وضع المجموعات ↢ ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  
	❏  دائما متصل ↢ ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  
	❏  وضع المخصص ↢ ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  
	❏  الشعار : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
	❏  تاريخ التشغيل : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   }
}