const mongoose = require('mongoose')
const always = require('../util/async/always')

function connectToDB (address) {
  return always(
    mongoose.connect(address, { useNewUrlParser: true })
  ).then(({data, error}) => {
    return error ? false : data
  })
}

module.exports = connectToDB
