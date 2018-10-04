import { createReducer } from './helpers'

const initialState = {}

export const reducer = createReducer(initialState, {
  'UPDATE_FROM_DB': (state, action) => {
    return {...state, [action.key]: action.value}
  }
})