const axios = require('axios')
const log = require('./log')

class SlackRequest {
  constructor (request, response) {
    this.body = request.body
    this.req = request
    this.res = response
    this.time = getNow()
    
    this.res.status(200).send()
    
    const [name, ...params] = this.body.text.split(' ')
    this.cmd = {
      name,
      params
    }
    
    this.response_url = this.body.response_url
  }

  get isStale () {
    return getNow() - this.time > minutes(28)
  }

  send (strObjorArr, opts) {
    return new Promise(resolve => {
      // Early exit if this request is too stale
      if (this.isStale) return resolve({response: false, res: false})

      if (orTest(strObjorArr, isString, isObject, isArray)) {
        axios.post(this.response_url, this.createResponse(strObjorArr, opts))
          .then(response => {
            resolve({
              promise: [],
              response: response.body,
              res: response.body
            })
          })
          .catch(err => {
            resolve({
              error: err,
              err
            })
          })
      } else {
        return resolve({response: false, res: false})
      }
    })
  }

  toJSON () {
    return {
      cmd: this.cmd,
      time: this.time,
      body: this.body,
      response_url: this.response_url
    }
  }

  createResponse (strObjorArr, opts = {}) {
    if (isObject(strObjorArr)) {
      return strObjorArr
    } else if (isString(strObjorArr)) {
      return {
        response_type: 'ephemeral',
        text: strObjorArr
      }
    } else if (isArray(strObjorArr)) {
      const [main, ...rest] = strObjorArr
      return {
        response_type: opts.response_type || 'ephemeral',
        text: main,
        attachments: this.createAttachments(rest)
      }
    }
  }

  createAttachments (arr) {
    return arr.map(this.createAttachment)
  }

  createAttachment (val) {
    if (isString(val)) {
      return {
        text: val
      }
    }

    if (val.promise && isPromise(val)) {
      
    }

    return val
  }
}

function getNow () {
  return new Date().getTime()
}

function minutes (x) {
  return x * 60 * 1000
}

function isString (str) {
  return typeof str === 'string'
}

function orTest (subject, ...tests) {
  for (const test of tests) {
    if (test(subject)) return true
  }

  return false
}

function isArray (arr) {
  return Array.isArray(arr)
}

function isPromise (prom) {
  return val instanceof Promise
}

function isObject (obj) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

// { token: 'b5nJDw48iYbob8KiorCY8o6H',
//   team_id: 'TBQ6K0VHP',
//   team_domain: 'bryntest',
//   channel_id: 'DCG5GCRSQ',
//   channel_name: 'directmessage',
//   user_id: 'UBS2XR4CE',
//   user_name: 'bryn',
//   command: '/harvest',
//   text: 'help',
//   response_url: 'https://hooks.slack.com/commands/TBQ6K0VHP/425247618885/Xpj42PX4URpBYA45pIJz3wRE',
//   trigger_id: '425096663762.398223029601.8a7e6bf5a8b6faaef273f174de2fb3fc' }

module.exports = SlackRequest
