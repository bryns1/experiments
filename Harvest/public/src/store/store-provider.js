import React from 'react'
import { Provider } from './context'

export default class StoreProvider extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: props.store.getState(),
      store: props.store
    }

    this.dispose = this.props.store.subscribe(({state}) => {
      this.setState({
        state
      })
    })
  }
  componentWillUnmount () {
    this.dispose()
  }
  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}
