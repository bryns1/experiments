import React from 'react'
import styled from 'styled-components'

import {FormLabel, FaintLabel} from './styles/font-styles'


const Label = styled.p`
  display: flex;

  .label{
    flex: 1;
  }
`

const SubLabel = styled.p`
  display: flex;
`

export const InputLabel = props => {
  return (
    <Label>
      <FormLabel className="label">{props.label}</FormLabel>
      {props.isOptional && <FaintLabel>Optional</FaintLabel>}
    </Label>
  )
}

export const InputSubLabel = props => {
  return (
    <SubLabel>
      <FaintLabel className="label">
        {props.subLabel}  
      </FaintLabel>
      {props.isOptional && <FaintLabel>Optional</FaintLabel>}
    </SubLabel>
  )
}

export const InputWrapper = styled.div`
  margin-bottom: 20px;
  flex: 1 0 calc(100% - 20px);
`