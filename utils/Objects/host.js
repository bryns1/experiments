// Object util
class Host{
  constructor(obj){
    this.obj = obj
  }
  get (p = '') {
    let pointer = this.obj
    let paths = p.split('.').filter(Boolean)
    for (const path of paths){
      if (typeof pointer !== 'object') return pointer
      pointer = pointer[path]
    }
    return pointer
  }
  isEmpty () {
    if(Array.isArray(this.obj)){
      return !Boolean(this.obj.length)
    }
    if(this.obj && this.obj !== null && typeof this.obj === 'object'){
      return !Boolean(Object.keys(this.obj).length)
    }
    return !Boolean(this.obj)
  }
  set (p, val) {
    let pointer = this.obj
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

    return this
  }
}

export default Host