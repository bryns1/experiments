const mongoose = require('mongoose')
const always = require('../util/async/always')
const log = require('./log')

function connectToDB (address, opts) {
  return always(
    mongoose.connect(address, { useNewUrlParser: true, ...opts })
  ).then(({data, error}) => {
    return error ? false : data
  })
}

module.exports = connectToDB
