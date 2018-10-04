import React from 'react'
import styled from 'styled-components'
import theme from '../../../util/elements/from-theme'
import {space} from 'styled-system'

export const Code = styled.span`
  display: inline-block;
  padding: 4px;
  border-radius: 4px 6px;
  background: rgb(255, 255, 255, 0.1);
  color: ${theme('primary')};
`

export const Error = styled.span`
  color: #ff3168;
`
