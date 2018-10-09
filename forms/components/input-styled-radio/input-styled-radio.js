import React from 'react'
import styled from 'styled-components'

import {colors} from '../../vars'

const Option = styled.div`
  min-width: 140px;
  padding: 1.5rem;

  background: ${props => props.selected ?  : ''}
`

const Select = styled.div`
  display: flex;
`

class StyledRadio extends React.Component{
  render(){
    return (
      <div>

      </div>
    )
  }
}