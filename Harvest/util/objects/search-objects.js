function searchObjects(arrOfObjects, query){
  const q = mustBeObject(query)
  return arrOfObjects.filter(
    item => {
      const queries = Object.entries(q)
      
      for (let [path, value] of queries) {
        if (getFromObject(item, path) !== value) {
          return false
        }
      }

      return true
    }
  )
}

function getFromObject(obj, path){
  const points = path.split('.')
  let pointer = obj

  for (let point of points) {

    if (!isObject(pointer)) {
      return undefined
    }

    pointer = pointer[point]
  }

  return pointer
}

function isObject(obj){
  return typeof obj === 'object' && obj !== null
}

function mustBeObject(obj){
  return isObject(obj) ? obj : {}
}

module.exports = searchObjects