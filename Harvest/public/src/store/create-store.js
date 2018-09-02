
export default function createStore (initial) {
  let state = initial || {}
  let listeners = {}
  let cancels = {}
  let index = 0
  let lastState

  function setState (updateObject) {
    const prevState = state

    const newState = {
      ...prevState,
      ...updateObject
    }

    lastState = prevState
    state = newState

    const updates = getUpdates(prevState, newState)
    if (!updates.length) return

    notify({state, prevState, updates, store: getStore()})
  }

  function getUpdates (oldState, newState) {
    const changes = Object.keys(newState)
    // If values are the same dont update
    const updates = changes.filter(key => !equal(oldState[key], newState[key]))
    return updates
  }

  function key () {
    return `k${index++}`
  }

  function notify (update) {
    const fns = Object.values(listeners)
    callAll(fns, update)
  }

  function next (fn) {
    let cancel = subscribe((...args) => {
      cancel()
      fn(...args)
    })

    return cancel
  }

  function subscribe (fn) {
    const k = key()

    let cancel = () => {
      delete listeners[k]
      delete cancels[k]
      cancel = () => {}
    }

    listeners[k] = fn
    cancels[k] = cancel

    return cancel
  }

  function equal (x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y
    }
  }

  function callAll (arr, ...args) {
    console.log(args)
    arr.map(fn => fn(...args))
  }

  function getState () {
    return state
  }

  function getStore () {
    return {
      setState,
      subscribe,
      next,
      getState,
      getStore
    }
  }

  return getStore()
}
