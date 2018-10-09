import React from 'react'
import styled from 'styled-components'

// Site variables
import {secondaryColour, headerHeight, primaryColour, tertiaryColourMid} from '../vars'

// Styles
import {SectionHeading, FaintLabel} from './styles/font-styles'
import SidebarLink from './styles/sidebar-link'

export const Page = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: block;
`

export const Inner = styled.div`
  padding: 20px;
  padding-top: 100px;
  position: relative;
  overflow-y: auto;
  margin: 0 auto;
  max-width: 650px;
  width: 60%;
  background: transparent;
`

export const Content = styled.div`
  background: ${secondaryColour};
  padding: 20px;
  margin-bottom: 100px;
`

export const Header = styled.div`
  background: ${primaryColour};
  height: ${headerHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

export const Nav = styled.div`
  width: 20%;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0px;
  padding-top: ${headerHeight}px;
  background: ${tertiaryColourMid};
`

export const Sidebar = styled.div`
  width: 20%;
  padding: 1rem;
  right: 0;
  bottom: 0;
  top: 0px;
  padding-top: ${headerHeight + 100}px;
  position: fixed;
  background: ${tertiaryColourMid};
`

export const SidebarLinks = props => {
  let routes = props.routes

  return (
    <ol>
      {
        routes.map(route => {
          return (
            <li>
              <SidebarLink to={route.path}>
                <SectionHeading>{route.name}</SectionHeading>
                <FaintLabel>{route.description}</FaintLabel>
              </SidebarLink>
            </li>
          )
        })
      }
    </ol>
  )
}