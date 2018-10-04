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

function createLogLevel (lvl) {
  const logger = console[lvl] || console.log
  const formattedLvl = chalkColor(lvl, `[${lvl.toUpperCase()}]`)
  return function (...logs) {
    if (logs[0] && logs[0].raw) {
      const [strings, ...rest] = logs
      // Treat as template literal
      return logger(formattedLvl, ...intertwine(strings, rest))
    }

    return logger(formattedLvl, ...logs)
  }
}

const log = createLogLevel('log')
log.error = createLogLevel('error')
log.warning = createLogLevel('warning')
log.warn = createLogLevel('warning')
log.say = createLogLevel('say')

module.exports = log

function intertwine (arr1, arr2) {
  const a = [...arr1]
  const b = [...arr2]
  const res = []

  while (a.length) {
    const A = a.shift()

    if (typeof res[res.length - 1] === 'string' && orType(A, 'string', 'number')) {
      res[res.length - 1] = res[res.length - 1] + A
    } else {
      res.push(A)
    }

    if (b.length) {
      const B = b.shift()
      if (typeof res[res.length - 1] === 'string' && orType(B, 'string', 'number')) {
        res[res.length - 1] = res[res.length - 1] + B
      } else {
        res.push(B)
      }
    } 
  }

  return res
}

function orType (subject, ...types) {
  for (const type of types) {
    if (typeof subject === type) return true
  }

  return false
}
