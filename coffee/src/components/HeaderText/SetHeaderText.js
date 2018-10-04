import React from 'react'
import {store} from '../../../store/store'

class SetHeaderText extends React.Component{
  componentDidMount(){
    const state = store.getState()
    if(state.app.headerText !== this.props.to){
      store.dispatch({type: 'UPDATE_HEADER_TEXT', payload: this.props.to || ""})
    }
  }
  componentWillUnmount(){
    const state = store.getState()
    if(state.app.headerText === this.props.to){
      store.dispatch({type: 'DEFAULT_HEADER_TEXT'})
    }
  }
  render(){
    return <span></span>
  }
}

export default SetHeaderText