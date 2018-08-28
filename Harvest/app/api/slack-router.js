const express = require('express')
const botkit = require('botkit')
const Router = express.Router()

const Bot = Botkit.slackbot({
  clientId: '',
  clientSecret: '',
})

Router.post('/', async (req, res) => {
  console.log(post)
})

Router.post('/link', async (req, res) => {
  
})

module.exports = Router