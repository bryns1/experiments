import React from 'react'
import styled from 'styled-components'
import {width, space, color} from 'styled-system'

const ComponentEl = styled.section`
  ${space}
  ${width}
  ${color}
  flex-direction: ${props => props.flexDirection || 'column'};
  display: flex;
  position: relative;
`

function Component (props) {
  return <ComponentEl {...props}/>
}

Component.Header = styled.div`
  position: relative;
  ${space}
`

Component.Body = styled.main`
  ${space}
  position: relative;
  flex: 1;
`

Component.Footer = styled.div`
  ${space}
`

Component.Actions = styled.div`
  display: flex;
`

export default Component
