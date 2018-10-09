import React from 'react'
import styled from 'styled-components'

const toggle = prop => state => {
  return {
    ...state,
    [prop]: !state[prop]
  }
}

const AccordianHeader = styled.div`
  display: flex;
  padding: 4px 10px;
  border-bottom: solid 1px #e2e2e2;

  & .fullWidth{
    flex: 1;
    margin: 0;
  }
`

const AccordianBody = styled.div`
  padding: 4px 10px;
`

export default class Accordian extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      open: typeof props.defaultOpen === 'undefined' ? props.defaultOpen : false
    }
  }

  toggle = e => {
    e.preventDefault()
    this.setState(toggle('open'))
  }

  render(){
    const { label } = this.props
    const labelType = typeof label
    const labelContent = labelType === 'undefined' 
    ? null
    : labelType === 'function'
      ? label(this.props)
      : labelType === 'string'
        ? <h4>{label}</h4>
        : null

    return (
      <div>
        <AccordianHeader onClick={this.toggle}>
          <span className="fullWidth">{labelContent}</span>
          <span>{this.state.open ? 'close' : 'open'}</span>
        </AccordianHeader>
        <AccordianBody>
          {
            this.state.open 
            ? this.props.render(this.props, this.state)
            : null
          }
        </AccordianBody>
      </div>
    )
  }
}