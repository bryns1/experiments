import { createReducer } from './helpers'

const initialState = {
}

export const reducer = createReducer(initialState, {
  UPDATE_USER: (state, action) => {
    return {
      ...state, 
      ...action.payload
    }
  },
  SIGN_OUT: (state, action) => {
    return null
  }
})