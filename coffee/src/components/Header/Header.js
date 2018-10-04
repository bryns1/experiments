import React from 'react'
import styled from 'styled-components'

import Centered from '../../global/Centered'

class Header extends React.Component{
  state = {
    y: 0
  }
  scroll = this.scroll.bind(this)
  

  constructor(){
    super()
  }

  componentDidMount(){
    window.addEventListener('scroll', this.scroll)
  }
  scroll(e){
    this.setState({
      y: window.pageYOffset
    })
  }
  render(){
    return (
      <HeaderBar shadowed={this.state.y > 100}>
        <Centered>
          {this.props.children}
        </Centered>
      </HeaderBar>
    )
  }
}

const HeaderBar = styled.div`
  display:flex;
  height: 60px;
`

const Flex = styled.div`
  display:flex;
`

const Grow = styled.div`
  flex: 1;
`

export default Header