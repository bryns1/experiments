import React from 'react'
import styled from 'styled-components'

const Centered = props => {
  return (
    <CenteredParent {...props}>
        {props.children}
    </CenteredParent>
  )
}

const CenteredParent = styled.div`
  display:${props => props.inline ? "flex-inline" : "flex"};
  justify-content: ${props => !props.vertical ? 'center' : 'unset'};
  align-items: ${props => !props.horizontal ? 'center' : 'unset'};
  width: 100%;
  height: 100%;
`

export default Centered