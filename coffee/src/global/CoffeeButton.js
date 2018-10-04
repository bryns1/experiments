import React from 'react'
import styled from 'styled-components'

import Centered from './Centered'

class CoffeeButton extends React.Component{
  render(){
    return ( 
      <ButtonSizer>
      <ButtonWrapper>
        <Centered style={{zIndex: 1}}>
          <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 0H1L0 8H34L33 0ZM33 9H1L5 42H29L33 9Z" fill={this.props.inverted ? "white" : "#20DECD"}/>
          </svg>
        </Centered>
      </ButtonWrapper>
      <div className="button-shadow"/>
      </ButtonSizer>
    )
  }
}

const ButtonSizer = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0px -4px 20px rgba(32, 222, 205, .1), 0px 8px 20px rgba(32, 222, 205, 0.21);
  border-radius: 50%;
  transition: box-shadow 0.6s, transform 0.6s;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background: white;

  & + .button-shadow{
    content: "";
    display: block;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgb(32, 222, 205);
    border-radius: 50%;
    z-index: -1;

    &:before{
      content: "";
      background: white;
      width: 120%;
      height: 120%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:hover{ 
    transform: translateY(-4px);   
    box-shadow: inset 0px -8px 20px rgba(32, 222, 205, .1), 0px 10px 40px rgba(32, 222, 205, 0.3); 
  }

  &:active{
    transition: box-shadow 0.1s, transform 0.1s;    
    transform: translateY(0px);       
    border-bottom: 0px;
    box-shadow: inset 0px 8px 20px rgba(32, 222, 205, 0.2), 0px 4px 10px rgba(32, 222, 205, 0);     
  }

  svg{
    width: 50%;
  }
`

export default CoffeeButton