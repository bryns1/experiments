const SlackAPI = require('./')

async function startup () {
  
}

function asyncMap (items, fn) {
  return Promise.all(items.map(fn))
}

module.exports = startup
