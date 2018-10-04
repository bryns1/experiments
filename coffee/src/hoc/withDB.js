import React from 'react'
import { connect, store } from '../../store/store'
import { db } from '../../fire'

const WithDB = keys => Comp => {
  return (
    <WithDBComponent keys={keys} render={props => <Comp {...props}/>}/>
  )
}

class WithDBComponent extends React.Component{
  componentDidMount(){
    if(Array.isArray(this.props.keys)){
      this.listeners = this.props.keys.map(key => {
        return db.ref(key).on('value', snap => {
          store.dispatch({
            type: "UPDATE_FROM_DB",
            key: this.props.key,
            value: snap.val()
          })
        })
      })
    }
  }
  componentWillUnmount(){
    this.listeners.forEach(cb => cb())
  }
  render(){
    return connect(state => {
      return {
        [key]: state.db[key]
      }
    })(<WithDBResult/>)
  }
}

const WithDBResult = props => {
  return React.cloneElement(React.Children.only(props.children), props)
}

export default WithDB