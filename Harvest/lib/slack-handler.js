const SlackRequest = require('./slack-request')
const log = require('./log')

class SlackHandler {
  constructor () {
    this.handlers = {}
    this.callbacks = {}
    this.help = {}

    this.index = 0
    this.cancels = {}
    this.default = 'help'
  }

  hasHandler (cmd) {
    if (!this.handlers[cmd]) return false
    return Boolean(Object.keys(this.handlers[cmd]).length)
  }

  get key () {
    return `k${this.index++}`
  }

  cmds (obj) {
    const commands = Object.entries(obj)
    this.registerHelp(obj)
    
    return commands.reduce((acc, [cmdName, cmd]) => {
      if (cmd.default) this.setDefault(cmdName)
      acc[cmdName] = this.cmd(cmdName, cmd.handler)
      return acc
    }, {})
  }

  registerHelp (cmds) {
    Object.keys(cmds).forEach(cmdName => {
      this.help[cmdName] = {
        ...this.help[cmdName],
        ...cmds[cmdName]
      }
    })
  }

  cmd (to, handler) {
    const key = this.key
    if (!this.handlers[to]) {
      this.handlers[to] = {}
    }

    this.handlers[to][key] = handler

    let cancel = () => {
      delete this.handlers[to][key]
      delete this.cancels[key]
      cancel = () => {}
    }

    this.cancels[key] = cancel

    return cancel
  }

  handle (slackReq) {
    log(slackReq.toJSON(), slackReq instanceof SlackRequest)
    if (!(slackReq instanceof SlackRequest)) {
      throw new Error(`SlackHandler can only handle instances of SlackRequest`)
    }

    this.last = this.current
    this.current = slackReq

    if (!slackReq.cmd.name) {
      slackReq.cmd.name = this.default
    }

    if (!this.hasHandler(slackReq.cmd.name)) {
      log.error('Early exit', slackReq.toJSON())
      return
    }

    return Promise.all(
      Object.values(this.handlers[slackReq.cmd.name]).map(fn => fn(slackReq))
    )
  }

  setDefault (val) {
    this.default = val
  }

  destroy () {
    Object.values(this.cancels).forEach(fn => {
      fn()
    })
  }

  getHelp () {
    return Object.keys(this.help).map(key => {
      let res = `*${capitolize(key)}*\nUseage               _${key} `

      res += this.help[key].args.filter(Boolean).map(str => `<${str}>`).join(', ') + '_'
      res += this.help[key].description ? `\nDescription        ` + this.help[key].description : ''
      
      return res
    })
  }

  actions (label, id, obj, opts) {
    const key = `select_${underscore(label)}_${this.key}`

    let cancel = () => {
      delete this.callbacks[key]
      delete this.cancels[key]
      cancel = () => {}
    }

    this.cancels[key] = cancel

    const prom = () => new Promise(resolve => {
      this.callbacks[key] = resolve
    })

    const payload = {
      text: label,
      attachment_type: 'default',
      color: '#ffa500',
      callback_id: key,
      name: key,
      actions: [{
        name: key,
        text: '',
        type: 'select',
        options: Object.entries(obj).map(([value, label]) => {
          return { label, value }
        })
      }],
      ...opts
    }
    
    return {
      payload,
      prom,
      cancel
    }
  }
}

function underscore (str) {
  return str.toLowerCase().replace(/ /g, '_')
}

function isString (str) {
  return typeof str === 'string'
}

function capitolize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function isObject (obj) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

module.exports = SlackHandler
