const express = require('express')
const Router = express.Router()
const User = require('../../models/user-schema')
const log = require('../../lib/log')

Router.post('/slack/', async (req, res) => {
  User.fromSlack(req.body)
    .then(user => {
      log('Sending user', user)
      res.send(user._id)
    })
    .catch(err => {
      res.status(403).send(err)
    })
})

// This is the callback route for the Harvest API
Router.get('/harvest/', async (req, res) => {
  try {
    const user = await User.findById(jsonParse(req.query.state).user._id)
    
    await user.getHarvestTokens(req.query.code)

    res.send('DONE')
  } catch (err) {
    log.error('Harvest throwed with', err)
  }
})

// This is the app route
Router.post('/harvest/', async (req, res) => {
  try {
    log('Request body', req.body)
    log('Requesting user ID ', req.body.id)
    const user = await User.findById(req.body.id)
    log('Got user', user)

    const tokens = await user.getHarvestTokens()

    log(tokens)
    if (tokens) {
      log('Got tokens', tokens)
    }

    let status = Boolean(tokens)

    res
      .send(status)
  } catch (err) {

  }
})

function jsonParse (str) {
  try {
    return JSON.parse(str)
  } catch (err) {
    return {}
  }
}

module.exports = Router
