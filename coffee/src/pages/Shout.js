import React from 'react'
import styled from 'styled-components'

import Wrapper from '../global/Wrapper'
import Centered from '../global/Centered'
import UserBar from '../global/UserBar'
import { connect } from '../global/Store'
import Button from '../global/Button'

class Shout extends React.Component{
  componentWillMount(){

  }
  render(){
    const users = Object.values(this.props.group).map(user => <UserBar shoutPage user={user}/>)
    return (
      <Container>
        <Wrapper>
          <h1>Who are you buying coffee for?</h1>
          {users}
        </Wrapper>
      </Container>
    )
  }
}

const Container = styled.div``

export default connect(state => ({
  group: state.group
}))(Shout)