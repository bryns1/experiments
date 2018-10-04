function $(){
  return $
}
let index = 0

class Sitekit{
  constructor(){
    this.widgets = {}
    this.listeners = {}
  }

  Widget(name){
    // Copy Widget
    class Def extends Widget{
      constructor(){
        super()
      }
    }
    Def._name = name

    this.widgets[name] = Def

    return Def
  }
  createWidget(name){
    const W = new this.widgets[name]({name, el: $, index: index++})
    return W
  }
}

class Widget {

  constructor({element, index, name}){
    this._name = name
    this.initIndex = index
    this.element = element
    this.on = $.on

    // Allow destroyables to be destroyed
    this._destroyables = []
    console.log('this ran')

    this.callSelf('create')

    bind(this, 'callSelf', '_destroy', 'destroys')
  }

  _destroy(){
    const res = this._destroyables.map(fn => fn())
    const uRes = this.callSelf('_destroy')

    return uRes || res
  }

  destroys(...items){
    items.forEach(item => {
      if (Array.isArray(item)) {
        this._destroyables = [
          ...this._destroyables,
          ...item
        ]
      } else if(typeof item === 'function'){
        this._destroyables.push(item)
      }
    })
  }

  callSelf(fn, ...args){
    if (typeof this[fn] === 'function') {
      return this[fn].apply(this, args)
    }
  }

}

const Site = new Sitekit()

function bind(self, ...items){
  for(const item of items) {
    self[item] = self[item].bind(self)
  }
}

class MyWidget extends Site.Widget('MyWidget'){
  constructor(){
    super()
    console.log('I was created')
  }
}

class MyWidget2 extends Site.Widget('MyWidget2'){

}

console.log(Site.widgets)

Site.createWidget('MyWidget')