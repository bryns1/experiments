import { reactive } from 'sitekit-extensions'

export default function (Site, $) {

  Site.widget('filter', {
    use: [ reactive() ],
    _create(){
      // Calls an array of functions on `_destroy`
      // Queue functions with this.destroys(<fn | [fn1, fn2]>)
      destroys(this)

      this.select = this.element.find('select')
      this.projects = json_parse(this.options.projects)
      
      this.state = {
        filter: this.select.val()
      }

      // Could also just make this `window.location.hash = this.select.val()`
      this.select.on( 'change', e => this.setState({ filter: this.select.val() }) )
      
      // Queues function to be destroyed
      this.destroys(
        // Same as `element.on` but returns an off() function
        on( $(window), 'hashchange', e => this.setState({ filter: currentHash() }) )
      )
    },
    react(){
      
      // Run any time filter is changed
      this.changed('filter', prevState => {
        if ( empty(prevState) ) {
          // This would happen on first run
        }

        const items = this.projects.sort( byProp(this.state.currentFilter) )

        // 
        // Render Items
        // ...
      })
    }

  })
}

function currentHash(){
  // Change `#hash` to `hash`
  // Using replace because it will still work if browsers one day decide to not include the #
  return window.location.hash.replace(/^\#/, '')
}

// Uses currying to make sure you only remove single function without having
// To store it anywhere or bind it to this
// Also returns a function that calls element.off()
function on(element, ev, handler){
  let off = () => {
    element.off(ev, handler)

    // Can only call this once
    off = () => {}
  }
  element.on(ev, handler)

  return off
}

function empty(obj){
  return Object.keys(obj).length
}

function json_parse(str){
  // Return object or undefined
  try{
    return JSON.parse(str)
  } catch (e) {} 
}

// Usage [objects].sort(byProp('industry'))
function byProp (prop) {
  return (a, b) => {
    return (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
  }
}

// Call this.destroys(fn) to queue functions to be called on _destroy
// This basically just calls an array of functions on _destroy
function destroys(self){
  const oldDestroy = self._destroy
  self._destroy = () => {
    oldDestroy.apply(self)
    self._destroyables.forEach(destroyable => destroyable())
  }

  self.destroys = function(fnOrArray){
    // This just adds functions to an array
    // Keep it fresh and immutable
    self._destroyables = [].concat(
      self._destroyables,
      fnOrArray
    )
  }
}