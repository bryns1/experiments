import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import $ from 'jquery'

class UserInfo extends React.Component{
  constructor(){
    super()
    this.ref = React.createRef()
  }
  onEnter = () => {
    const targets = $(this.ref.current).find('[data-in]').toArray()
    anime({
      targets,
      duration: 1000,
      translateY: [-10, 0],
      opacity: [0, 1],
      delay: (el, i) => i * 60,
      easing: 'easeOutQuart'
    })
  }
  onExit = () => {
    this.ref.current.style = 'margin-top: 0;'
    anime({
      targets: this.ref.current,
      height: 0,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad'
    })
  }
  render(){
    return (
      <Transition in={this.props.in} unmountOnExit appear onEnter={this.onEnter} onExit={this.onExit} timeout={{enter: 1000, exit: 1000}}>
          <InfoWrapper innerRef={this.ref}>
            {this.props.user.debt.map(debt => {
              return (
              <Row key={debt.user}>
                <Name data-in>{debt.user}</Name>
                <FlexPad/>
                <Amount data-in>{debt.amount}</Amount>
              </Row>
              )
            })}
          </InfoWrapper>
      </Transition>
    )
  }
}

const InfoWrapper = styled.div`
  &:before{
    content: '';
    height: 20px;
    display: block;
  }
`

const Row = styled.div`
  display: flex;
  margin-bottom: 13px;
  font-size: 16px;
  font-weight: bold;
`

const FlexPad = styled.div`
  flex: 1;
`

const Name = styled.h3`

`

const Amount = styled.span``

export default UserInfo