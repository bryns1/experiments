import React from 'react'
import axios from 'axios'
import query from 'query-string'
import Button from '../app-components/button'
import connect from '../store/connect'

class SlackAuth extends React.Component {
  state = {
    user: {
      name: 'user',
      place: '',
    }
  }
  componentDidMount () {
    const q = query.parse(window.location.search)

    if (q.u) {
      this.props.store.setState({
        user: decode(q)
      })
    }
  }
  render () {
    if (this.props.user) {
      return <WithUser user={this.props.user}/>
    }

    return <WithoutUser/>
  }
}

const WithUser = props => {
  return (
    <div>
      <h1>Hey @{props.user.name}!</h1>
      <p>Would you like to set up your harvest / slack integration?</p>
      <Button>Setup account</Button>
    </div>
  )
}

const WithoutUser = props => {
  return (
    <p>Use `/harvest link` in slack to link your accounts</p>
  )
}

function decode (str) {
  return JSON.parse(atob(str))
}

export default connect(store => {
  return {user: store.state.user}
})(SlackAuth)