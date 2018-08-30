import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  state = {
    value: ''
  }

  onChange = e => {
    this.setState({value: e.target.value})
    console.log('this was fricking changed')
  }

  render () {
    return (
      <div>
        <Link to="/">back</Link>
        <input value={this.state.value} placeholder={this.props.placeholder || ''} onChange={this.onChange}/>
      </div>
    )
  }
}
