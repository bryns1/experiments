// Object util

function host(obj){
  const self = {}

  // Safely access properties
  self.get = p => {
    let pointer = obj
    let paths = p.split('.')
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

  return self
}

export default host