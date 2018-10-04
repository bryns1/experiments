import React from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../../util/elements/from-theme'

const Link = withRouter(props => {
  function go (e) {
    e.preventDefault()
    props.history.go(props.to)
  }
  return <LinkEl onClick={go} href={props.to}>{props.children}</LinkEl>
})

const LinkEl = styled.a`
  color: ${theme('primary')};

  &:visited{
    color: ${theme('primary')};
  }
`

export default Link
