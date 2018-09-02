import React from 'react'
import styled from 'styled-components'
import {width, space, color} from 'styled-system'

const SectionEl = styled.section`
  ${space}
  ${width}
  ${color}
  flex-direction: ${props => props.flexDirection || 'column'};
  display: flex;
  position: relative;
`

function Section (props) {
  return <SectionEl {...props}/>
}

Section.Header = styled.div`
  position: relative;
  ${space}
`

Section.Body = styled.main`
  ${space}
  position: relative;
  flex: 1;
`

Section.Footer = styled.div`
  ${space}
`

Section.Actions = styled.div`
  display: flex;
`

export default Section
