import React from 'react'
import {store} from '../../store/store'

class SetHeaderTextComponent extends React.Component{
  componentDidMount(){
    const state = store.getState()
    console.log(state)
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
    return (
      <>{this.props.children}</>
    )
  }
}




const setHeaderText = text => Component => props => {
  return <SetHeaderTextComponent key={text} to={text}><Component {...props}/></SetHeaderTextComponent>
}

export default setHeaderText