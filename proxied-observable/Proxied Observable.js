// Observable

function logToServer(...args){
  console.log(...args)
}

const obj = {
  fn: () => {
    console.log("happened")
  }
}

const proxy = new Proxy(obj, {
  get: (target, key) => {
    console.log('get happened')
    return target[key]
  },
  apply: () => {
    console.log("hey")
  },
  set: (target, key, value) => {
    if(key === 'definitely'){
      return false
    }
    logToServer(key, value)
    target[key] = value
  }
})

proxy['hello'] = '123'
proxy['yes'] = '123'

proxy.fn()

console.log(obj)