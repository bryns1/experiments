import createStore from './create-store'

const initialState = localState()

const store = createStore(initialState)

function localState (store) {
  if (store) {
    return store.subscribe(({state}) => {
      window.localStorage.setItem('app_store', JSON.stringify(state))
    })
  } else {
    return window.localStorage.getItem('app_store')
  }
}

localState(store)

export default store
