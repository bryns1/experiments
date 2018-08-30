const Botkit = require('botkit')
const config = require('../config')

const controller = Botkit.slackbot(config.SLACK)

controller.hears('(.*)', 'message_received', (bot, message) => {
  bot.reply(message, 'Hello World!')  
})

module.exports = controller
