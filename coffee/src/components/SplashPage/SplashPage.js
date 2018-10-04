import React from 'react'
import styled from 'styled-components'

class Splash extends React.Component{
  render(){
    return (
      <SplashContainer></SplashContainer>
    )
  }
}

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default Splash