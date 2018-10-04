import React from 'react'
import styled, {css} from 'styled-components'
import theme from '../../../util/elements/from-theme'
import { CardTitle, CardDescription } from '../app-styles/card'
import Section from '../app-styles/section'
import { width, space } from 'styled-system'
import {rgba} from 'polished'

const AuthStep = props => {
  return (
    <AuthStepElement complete={props.complete} disabled={props.disabled || props.complete}>
      <Section flexDirection="row">
        <Section.Header>
          <StepNum complete={props.complete}>{props.index}</StepNum>
        </Section.Header>
        <Section.Body pl={32}>
          <Section>
            <Section.Header>
              <CardTitle>{props.title}</CardTitle>
            </Section.Header>
            <Section.Body>
              <CardDescription>{props.description}</CardDescription>
            </Section.Body>
            <Section.Footer pt={20}>
              {props.actions(props)}
            </Section.Footer>
          </Section>
        </Section.Body>
      </Section>
    </AuthStepElement>
  )
}

const AuthStepElement = styled.div`
  padding: white;
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  ${width}
  ${space}
  border-radius: ${theme('border-radius')};
  transition: opacity 0.3s;

  ${props => props.disabled && 
  css`
    opacity: 0.3;
    pointer-events: none;
  `
}
`

const StepNum = styled.div`
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border: solid 1px ${rgba('white', 0.4)};
  color: white;
  border-radius: 50%;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 10px;

  &:after{
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
    background: ${rgba('white', 0.4)}
  }
`

function createAction (action, i, arr) {
  return (<Button mt={30} mr={i !== arr - 1 && 20} onClick={action.handle} type={action.type} key={action.label + i}>{action.label}</Button>)
}

export default AuthStep
