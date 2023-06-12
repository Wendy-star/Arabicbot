const fs = require('fs')
exports.run = {
   usage: ['menu', 'اوامر', 'الاوامر', 'فوجي'],
   hidden: ['menutype'],
   async: async (m, {
      client,
      text,
      isPrefix,
      plugins
   }) => {
      try {
         client.menu = client.menu ? client.menu : {}
         const id = m.chat
         const local_size = fs.existsSync('./' + global.database + '.json') ? await Func.getSize(fs.statSync('./' + global.database + '.json').size) : ''
         message = global.db.setting.msg.replace('+tag', `@${m.sender.replace(/@.+/g, '')}`).replace('Hi', `السلام عليكم يا`).replace('an', ``).replace('I', ``).replace('automated', ``).replace('system', ``).replace('WhatsApp', ``).replace('an', ``).replace('Bot', ``).replace(') ', ``).replace('(', ``).replace('am', ``).replace('that', ``). replace('c', ``).replace('help', ``).replace('to', ``).replace('do', ``).replace('something', ``).replace(',', ``).replace('search', ``).replace('and', ``).replace('get', ``).replace('data', ``).replace('if', ``) .replace('information', ``).replace('only', ``).replace('through', ``).replace('WhatsApp', ``).replace('*Library*', ``).replace('*Database*', ``).replace('◦', `حياك الله في بوت فوجي المطور من قبل فريق الـ Arena للتعرف على باقي الأوامر اضغط على قرائة المزيد`).replace('', ``).replace('Baileys', ``).replace('v+version', ``).replace('*Rest', ``).replace('API*', ``).replace('https://api.neoxr.my.id', ``).replace('https://youtube.com/@itsukabotz', ``).replace('*Source*', ``).replace('error', ``).replace('you', ``).replace('find', ``).replace('the', ``).replace('plan', ``).replace('contact', ``).replace('upgrade', ``).replace('premium', ``).replace('want', ``).replace('to', ``).replace('or', ``).replace('owner.', ``).replace('if', ``).replace('an', ``).replace(':', ``).replace(':', ``).replace(':', ``).replace(':', ``).replace(':', ``).replace('/', ``).replace('If', ``).replace('◦', ``).replace('◦', ``) .replace('◦', ``).replace('+db', ``).replace('.', ``)
         const style = global.db.setting.menuStyle
         if (style == 1) {
            if (text) {
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.usage && v.run.category == text.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Category not available.`), m)
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               const print = commands.sort((a, b) => a.usage.localeCompare(b.usage)).map(v => `◦  ${isPrefix + v.usage} ${v.use}`).join('\n')
               return m.reply(print)
            } else {
               let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.usage)
               let cmd = Object.fromEntries(filter)
               let category = []
               for (let name in cmd) {
                  let obj = cmd[name].run
                  if (!cmd) continue
                  if (!obj.category) continue
                  if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
                  else {
                     category[obj.category] = []
                     category[obj.category].push(obj)
                  }
               }
               let rows = []
               const keys = Object.keys(category).sort()
               for (let k of keys) {
                  rows.push({
                     title: k.toUpperCase(),
                     rowId: `${isPrefix}menutype ${k}`,
                     description: ``
                  })
               }
               client.sendList(m.chat, '', message, global.botname, 'Tap!', [{
                  rows
               }], m)
            }
         } else if (style == 2) {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.usage)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n乂  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.usage && v.run.category == k.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map(v => `	◦  ${isPrefix + v.usage} ${v.use}`).join('\n')
            }
            client.sendMessageModify(m.chat, print + '\n\n' + global.footer, m, {
               ads: true,
               largeThumb: true,
               url: global.db.setting.link
            })
         } else if (style == 3) {
            if (text) {
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.usage && v.run.category == text.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Category not available.`), m)
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               const print = commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
                  if (i == 0) {
                     return `*❖*  ${isPrefix + v.usage} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                     return `*❖*  ${isPrefix + v.usage} ${v.use}`
                  } else {
                     return `❈  ${isPrefix + v.usage} ${v.use}`
                  }
               }).join('\n')
               return m.reply(print)
            } else {
               let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.usage)
               let cmd = Object.fromEntries(filter)
               let category = []
               for (let name in cmd) {
                  let obj = cmd[name].run
                  if (!cmd) continue
                  if (!obj.category) continue
                  if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
                  else {
                     category[obj.category] = []
                     category[obj.category].push(obj)
                  }
               }
               let rows = []
               const keys = Object.keys(category).sort()
               for (let k of keys) {
                  rows.push({
                     title: k.toUpperCase(),
                     rowId: `${isPrefix}menutype ${k}`,
                     description: ``
                  })
               }
               client.sendList(m.chat, '', message, global.botname, 'Tap!', [{
                  rows
               }], m)
            }
         } else if (style == 4) {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.usage)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.usage && v.run.category == k.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
                  if (i == 0) {
                     return `*❖*  ${isPrefix + v.usage} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                     return `*❖*  ${isPrefix + v.usage} ${v.use}`
                  } else {
                     return `*❈*  ${isPrefix + v.usage} ${v.use}`
                  }
               }).join('\n')
            }
            client.sendMessageModify(m.chat, print + '\n\n' + global.footer, m, {
               ads: false,
               largeThumb: true,
               url: global.db.setting.link
            })
         } else if (style == 5) {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.usage)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.usage && v.run.category == k.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
                  if (i == 0) {
                     return `*❖*  ${isPrefix + v.usage} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                     return `*❖*  ${isPrefix + v.usage} ${v.use}`
                  } else {
                     return `*❈*  ${isPrefix + v.usage} ${v.use}`
                  }
               }).join('\n')
            }
            var buttons = [{
               buttonId: `${isPrefix}hitstat`,
               buttonText: {
                  displayText: 'Hitstat'
               },
               type: 1
            }, {
               buttonId: `${isPrefix}sc`,
               buttonText: {
                  displayText: 'Source'
               },
               type: 1
            }]
            client.sendButton(m.chat, global.db.setting.cover, print, global.footer, m, buttons, {
               document: true
            })
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}