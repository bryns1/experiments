let CONFIG = require('./config')
const ngrok = require('ngrok')
const fs = require('fs')
const log = require('./lib/log')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const opn = require('opn')

async function main () {
  const url = await ngrok.connect(3000)

  updateConfig('NGROK.url', url)
  log('NGROK url is: ' + chalk.yellow(url))

  clipboardy.writeSync(url)
  if (clipboardy.readSync() === url) {
    log(chalk.green('Copied to clipboard'))
  }

  await wait(2000)
  log('Opening sites to update:', CONFIG.SITES_TO_UPDATE.map(site => `\n      - ${chalk.yellow(site)}`).join(''))

  await wait(2000)
  const _processes = CONFIG.SITES_TO_UPDATE.map(site => opn(site))
  
  await wait(hours(7) + minutes(45))
  log.error('NGROK has timed out run `yarn proxy` to restart')
}

function updateConfig (path, val) {
  const newConfig = host(CONFIG)
    .set('NGROK', {
      url: val,
      created: new Date().getTime()
    })
    .val()
  CONFIG = newConfig
  fs.writeFileSync('config.json', JSON.stringify(newConfig, null, 2))
}

function host (obj) {
  return {
    set: (path, val) => {
      const points = path.split('.')
      const newObj = {...obj}
      let target = newObj
      const last = points.pop()
      
      for (const point of points) {
        if (isObject(target[point])) {
          target = target[point]
        } else {
          target[point] = {}
          target = target[point]
        }
      }

      target[last] = val
      return host(newObj)
    },
    val: () => {
      return obj
    }
  }
}

function minutes (x) {
  return seconds(x) * 60 
}

function seconds (x) {
  return x * 1000
}

function hours (x) {
  return minutes(x) * 60
}

function isObject (obj) {
  return typeof obj === 'string' && obj !== null
}

function wait (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

main().catch(err => {
  console.log(err)
})
