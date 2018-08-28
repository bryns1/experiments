const fs = require('fs')
const path = require('path')

function readConfig(){
  const val = fs.readFileSync(__dirname + '/../config')
  let paths = []

  const result = val
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n')
  .filter(Boolean)
  .reduce((index, line) => {

    if (line.charAt(0) === '#') {
      paths.pop()
      return index
    }

    if (!line.includes('=') && !line.includes('#')) {
      paths.push(line)
      index[line] = {}
      return index
    }

    const [name, value] = line.split('=').map(str => str.trim())
    console.log(name, value)
    setObject(index, [...paths, name], value)

    return index

  }, {})

  return result
}

function setObject(obj, paths, val){
  if (typeof paths === 'string') {
    paths = paths.split('.')
  }
  let last = paths.pop()
  let pointer = obj

  for (const needle of paths) {
    if (!isObject(pointer[needle])) {
      pointer[needle] = {}
    }
    pointer = pointer[needle]
  }

  pointer[last] = val
}

function isObject(obj){
  return typeof obj === 'object' && obj !== null
}

process.env = {
  ...process.env,
  ...readConfig()
}

console.log(process.env)