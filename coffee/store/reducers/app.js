import { createReducer } from './helpers'

const initialState = {
  loaded: false,
  gotLoginError: false,
  headerText: `Who's our biggest freeloader?`,
  selectedUser: ''
}

export const reducer = createReducer(initialState, {
  "UPDATE_APP_STATE": (state, action) => {
    return {...state, ...action.state}
  },
  "UPDATE_HEADER_TEXT": (state, action) => {
    return {
      ...state,
      headerText: action.payload
    }
  },
  "SELECT_USER": (state, action) => {
    return {
      ...state,
      selectedUser: action.payload
    }
  },
  "DEFAULT_HEADER_TEXT": (state, action) => {
    if(state.headerText === initialState.headerText) return state
    return {
      ...state,
      headerText: initialState.headerText
    }
  }
})