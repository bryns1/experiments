import styled from 'styled-components'
import theme from '../../../util/elements/from-theme'
import {space} from 'styled-system'

export const PageTitle = styled.h1`
  ${space}
  font-weight: 700;
  font-size: 30px;
  color: ${theme('page-title')};
`

export const Page = styled.div``

export const PageDescription = styled.p`
  ${space}
  font-weight: 400;
  font-size: 14px;
  color: ${theme('page-description')};
  font-family: monospace;
`

export const PageHeading = styled.div`
  ${space}
`
