export default class Subject{
  constructor(opts){
    this.opts = Object.assign({
      running: true
    }, opts)

    this._subject = {
      index: 0,
      listeners: {},
      cancels: {}
    }

    this.on = this.on.bind(this)
    this._key = this._key = this._key.bind(this)
    this.emit = this.emit.bind(this)
    this.once = this.once.bind(this)
    this.emitter = this.emitter.bind(this)
  }
  _key(){
    return `listener_${this._subject.index++}`
  }
  on(name, fn){
    const key = this._key()
    if(!this._subject.listeners[name]) this._subject.listeners[name] = {}
    this._subject.listeners[name][key] = fn
    const cancels = () => {
      delete this._subject.listeners[name][key]
      delete this._subject.cancels[key]
      if(!Object.keys(this._subject.listeners[name]).length){
        delete this._subject.listeners[name]
      }
    }
    this._subject.cancels[key] = cancels
    return cancels
  }
  emit(name, ...args){
    if(this._subject.listeners[name]){
      return Object.values(this._subject.listeners[name]).map(fn => {
        fn(...args)
      })
    }
  }
  once(name, fn){
    // Use var to hoist variable (not sure if needed)
    var cancel = this.on(name, (...args) => {
      if(cancel) cancel()
      fn(...args)
    })
  }
  emitter(name){
    return [
      name,
      (...args) => {
        this.emit(name, ...args)
      } 
    ]
  }
}