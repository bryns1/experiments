import React from 'react'
import axios from 'axios'
import query from 'query-string'
import Button from '../components/button'

export default class SlackAuth extends React.Component {
  state = {
    user: {
      name: 'user',
      place: '',
    }
  }
  componentDidMount () {
    const q = query.parse(window.location.search)

    if (q.u) {
      this.setState({
        user: decode(q.u)
      })


    }
  }
  render () {
    return (
      <div>
        <h1>Hey @{this.state.user.name}!</h1>
        <p>Would you like to set up your harvest / slack integration?</p>
        <Button>Setup account</Button>
      </div>
    )
  }
}

function decode (str) {
  return JSON.parse(atob(str))
}
