import { createStore, combineReducers } from 'redux'
import { debounce, parse, stringify } from '../util'
import * as reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  loadStore()
)

function saveStore(s){
  const save = debounce(300)(() => {
    localStorage.setItem('redux_storage', stringify(s.getState()) || {})
  })

  const unsub = s.subscribe(save)
}

function loadStore(){
  return parse(localStorage.getItem('redux_storage')) || {}
}

saveStore(store)

export const dispatch = store.dispatch


window.store = store

export {store}