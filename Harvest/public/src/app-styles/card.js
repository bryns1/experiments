import styled from 'styled-components'
import theme from '../../../util/elements/from-theme'

export const CardTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  margin-bottom: 4px;
  color: ${theme('card-title')};
`

export const CardDescription = styled.p`
  margin: 0;
  font-family: monospace;
`
