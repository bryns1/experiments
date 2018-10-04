import React from 'react'
import { Consumer } from './context'

const connect = fn => Component => function ConnectComponent (props) {
  return (
    <Consumer>
      {state => <Component {...fn(state.state, state.store)} {...props}/>}
    </Consumer>
  )
}

export default connect
