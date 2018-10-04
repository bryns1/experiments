import React from 'react'
import styled from 'styled-components'
import fire from '../../fire'
const db = fire.database()

import Wrapper from '../global/Wrapper'
import Centered from '../global/Centered'
import UserBar from '../components/UserBar/UserBar'
import { connect } from '../hoc/stateComponents'
import Button from '../global/Button'
import { login } from '../../auth'
import SetHeaderText from '../components/HeaderText/SetHeaderText';
import {TransitionGroup} from 'react-transition-group'

const users = [
  {
    name: "Matt",
    debt: [
      {user: 'Bryn', amount: 3},
      {user: 'Jeremy', amount: 2},
      {user: 'Dan', amount: 3},
      {user: 'Elliot', amount: 18}
    ]
  },
  {
    name: "Bryn",
    debt: [
      {user: 'Bryn', amount: 3},
      {user: 'Jeremy', amount: 2},
      {user: 'Dan', amount: 3},
      {user: 'Elliot', amount: 18}
    ]
  },
  {
    name: "Jeremy",
    debt: [
      {user: 'Bryn', amount: 3},
      {user: 'Jeremy', amount: 2},
      {user: 'Dan', amount: 3},
      {user: 'Elliot', amount: 18}
    ]
  }
]

class Home extends React.Component{
  login = () => {
    login()
  }
  render(){
    return (
      <Wrapper>
        <SetHeaderText to="Who's our biggest freeloader?"/>
        <TransitionGroup>
          {users.map((user, i) => <UserBar key={user.name} delay={1800 + i * 100} user={user}/>)}
        </TransitionGroup>        
      </Wrapper>
    )
  }
}

const PageTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 14px;
`

export default connect(state => {
  return {
    user: state.user
  }
})(Home)