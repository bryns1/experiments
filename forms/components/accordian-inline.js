import React from 'react'
import styled from 'styled-components'

function whenProp(prop, truth, falseth = ''){
  return props => props[prop] ? truth : falseth
}

const AccordianHeader = styled.div`
  &::before{
    content: '';
    width: 10px;
    height: 10px;
    margin-right: 20px;
    border-radius: 10px;
    background: ${whenProp('active', 'blue', 'red')};
    display: inline-block;
    position: relative;
  }
`

const AccordianWrapper = styled.div``

class InlineAccordian extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: props.defaultOpen ? props.defaultOpen : false
    }
  }
  toggle(prop){
    return e => {
      e.preventDefault()
      this.setState(state => {
        return {
          [prop]: !state[prop]
        }
      })
    }
  }
  render(){
    const accordianContent = this.state.open && this.props.render
      ? this.props.render(this.props, this.state)
      : null
     
    return (
      <AccordianWrapper>
        <AccordianHeader active={this.state.open} onClick={this.toggle('open')}>
          {this.props.label}
        </AccordianHeader>
        {accordianContent}
      </AccordianWrapper>
    )
  }
}

function toggle(prop){

}

export default InlineAccordian