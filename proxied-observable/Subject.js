class Subject{
  constructor(subject, handlers = {}){
    const types = ['array', 'object']
    if(!typeof subject in types) throw Error(`Tried to supply a Subject with a ${typeof subject}. Subjects will only take one of the following < ${types.join(` | `)} >`)
    this.subject = subject
    return new Proxy(this, {
      set: (target, key, value) => {
        return this.set(key, value)
      },
      ...handlers
    })
  }

  [Symbol.iterator](){
    const keys = Object.keys(this.subject)
    let currentIndex = -1

    return {
      next: () => {
        currentIndex++
          return ({
          value: [
            keys[currentIndex],
            this.clone(this.subject[keys[currentIndex]])
          ],
          done: !(currentIndex in keys),
        })
      }
    }
  }

  without(...keys){
    return new Subject(keys.reduce(
      (acc, key) => {
        const {[key]:_, ...y} = acc
        return y
      }, {...this.subject})
    )
  }

  has(...keys){
    for(const key of keys){
      if(typeof this.subject[key] === 'undefined') return false
    }

    return true
  }

  difference(subject){
    const inKeys = Object.keys(subject)
    const prevKeys = Object.keys(this.subject)

    if(inKeys.length !== prevKeys.length) return true

    for(const key of inKeys){
      if(subject[key] !== this.subject[key]) return true
    }

    return false
  }

  toJS(){
    return this.subject
  }

  diff(subject){
    const inKeys = Object.keys(subject)
    const prevKeys = Object.keys(this.subject)
    const result = {}

    for (const group of [inKeys, prevKeys]){
      for (const key of inKeys){
        if(!prevKeys.includes(key)){
          result[key] = subject[key]
        }
      }
    }

    return new Subject(result)
  }

  select(key){
    return new Subject(this.clone(this.subject[key]))
  }

  clone(source){
    const target = source || this.subject

    if(Array.isArray(source)){
      return [...target]
    }
    if(target instanceof Object){
      return {...target}
    }
    

    return target
  }

  get(key){
    return this.clone(this.subject[key])
  }

  set(key, val){
    const result = this.clone(this.subject)
    result[key] = val
    this.subject = result
  }
}

const subject = new Subject(['hey', 'there'])

subject[2] = false

console.log(subject)



// for (const [key, val] of subject.without('0', '1')){
//   console.log(key, val)
// }