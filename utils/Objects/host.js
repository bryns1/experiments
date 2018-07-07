// Object util
function host(obj){
  const self = {}

  // Safely access properties
  self.get = (p = '') => {
    let pointer = obj
    let paths = p.split('.').filter(Boolean)
    for (const path of paths){
      if (typeof pointer !== 'object') return pointer
      pointer = pointer[path]
    }
    return pointer
  }

  // Check if object is empty
  self.isEmpty = () => {
    if(Array.isArray(obj)){
      return !Boolean(obj.length)
    }
    if(obj && obj !== null && typeof obj === 'object'){
      return !Boolean(Object.keys(obj).length)
    }
    return !Boolean(obj)
  }

  self.set = (p, val) => {
    let pointer = obj
    let paths = p.split('.')
    let lastPath

    paths.forEach((path, i) => {
      lastPath = path
      if(typeof pointer[path] === 'undefined'){
        pointer[path] = {}
      }

      if(paths[i + 1]){
        pointer = pointer[path]
      }
    })

    pointer[lastPath] = val

    return self
  }

  return self
}

export default host