import styled from 'styled-components'

export const Flex = styled.div`display: flex;`

export const FlexItem = styled.div`
  ${props => props.right ? 'margin-left: auto;' : ''}
  ${props => props.left ? 'margin-right: auto;' : ''}
`