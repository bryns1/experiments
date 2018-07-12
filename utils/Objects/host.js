// Object util
const clone = (...args) => Object.assign({}, ...args)

function addMethods(self, ...methods){
  const all = {}
  methods.forEach(method => {
    Object.assign(all, {
      [method](p){
        return Object[method](self.get(p))
      }
    })
  })

  all.keys().forEach(key => {
    all[key] = all[key].bind(self)
  })

  Object.assign(self, all)
}

// Object util
class Host{
  constructor(obj){
    this.obj = obj

    addMethods(this, 'keys', 'entries')
  }
  get (p = '') {
    let pointer = clone(this.obj)
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
    const obj = clone(this.obj)
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

    this.obj = obj

    return this
  }
  entries(p){
    return Object.entries(this.get(p))
  }
  keys(p){
    return Object.keys(this.get(p))
  }
  values(p){
    return Object.values(this.get(p))
  }
  map(...args){
    let h = clone(this.obj)
    let fn = args[0]

    console.log(h)

    if(args.length > 1){
      const p = args[0]
      fn = args[1]

      h = Object.entries(this.get(p))
    }
    return h.reduce((acc, ...rest) => acc.push(fn(...rest)), [])
  }
}

export default Host