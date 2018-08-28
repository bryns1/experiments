const chalk = require('chalk')

const chalkColor = (lvl, str) => {
  const map = {
    'log': 'green',
    'warning': 'yellow',
    'warn': 'yellow',
    'error': 'red'
  }

  const color = map[lvl] || 'green'

  return chalk[color](str)
}

function createLogLevel(lvl){
  const logger = console[lvl] || console.log
  const formattedLvl = chalkColor(lvl, `[${lvl.toUpperCase()}]`)
  return function (...logs) { return logger(formattedLvl, ...logs) }
}

const log = createLogLevel('log')
log.error = createLogLevel('error')
log.warning = createLogLevel('warning')
log.warn = createLogLevel('warning')
log.say = createLogLevel('say')

module.exports = log