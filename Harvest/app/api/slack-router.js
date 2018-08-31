const express = require('express')
const Router = express.Router()
const controller = require('../slackbot')
const SlackRequest = require('../../lib/slack-request')
const SlackHandler = require('../../lib/slack-handler')
const log = require('../../lib/log')
const CONFIG = require('../../config')

const Harvest = new SlackHandler()

Harvest.cmds({

  help: {
    default: true,
    args: ['command'],
    description: 'Lists all available commands',

    async handler (slack) {
      await slack.send([
        'Hey! Here are some commands you can use',
        ...Harvest.getHelp()
      ])
    }
  },

  link: {
    description: 'Link your slack and harvest accounts',

    async handler (slack) {
      const slackUser = {
        id: slack.body.user_id,
        name: slack.body.user_name
      }
      await slack.send(`Go to ${CONFIG.HOST}/auth/slack?u=${encode(slackUser)} to link account`)
    }
  },

  start: {
    description: 'Start a harest project in ber',
    
    async handler (slack) {
      await slack.send('Start a project timer')
    }
  }
})

Router.post('/', async (req, res) => {
  res.send('LHUKkasjdflasdf')
})

Router.post('/bot', async (req, res) => {
  const slackReq = new SlackRequest(req, res)
  
  log('Pre handle', slackReq.toJSON())
  Harvest.handle(slackReq)
})

Router.post('/bot', async (req, res) => {
  // respond to FB that the webhook has been received.
  res.status(200)
  res.send('ok')

  const bot = controller.spawn({})

  controller.handleWebhookPayload(req, res, bot)
})

function encode (object) {
  return Buffer.from(JSON.stringify(object)).toString('base64')
}

module.exports = Router
