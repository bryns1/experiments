const express = require('express')
const Router = express.Router()
const User = require('../../models/user-schema')
const log = require('../../lib/log')
// const CONFIG = require('../../config')

Router.post('/active', async (req, res) => {
  try {
    const user = await User.findById(req.body.id)
    const entries = await user.getActiveHarvestEntries()
    log('Entries', entries)
  } catch (err) {
    res.status(401).send(err)
  }
})

module.exports = Router
