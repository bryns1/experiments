import styled, {css} from 'styled-components'
import theme from '../../../util/elements/from-theme'
import {space} from 'styled-system'
import {rgba as _rgba} from 'polished'
import {loadingAnimation} from './keyframes'

export default styled.button`
  min-height: 40px;
  background: ${theme('primary')};
  border: solid 1px ${theme('primary')};
  color: black;
  padding: 8px 24px;
  font-family: monospace;
  min-width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  outline: none;
  font-weight: bold;
  border-radius: ${theme('border-radius')};
  box-shadow: 0px 10px 25px ${rgba(theme('primary'), 0.2)};
  ${space}
  ${props => props.flex ? `flex: ${props.flex};` : ''}

  &:disabled{
    pointer-events: none;
    opacity: 0.4;
  }

  &:hover{
    transform: translateY(-2px);
    box-shadow: 0px 10px 25px ${rgba(theme('primary'), 0.3)};

    ${whenProp({
    'loading': css`
      transform: none;
      box-shadow: 0px 10px 25px ${rgba(theme('primary'), 0.2)};
    `
  })}
  }

  &:active{
    transition: transform 0.1s;
    transform: translateY(0px);
    box-shadow: 0px 10px 25px ${rgba(theme('primary'), 0.1)};
  }

  ${whenProp({
    'loading': css`
      opacity: 0.8;
      cursor: progress;
    `
  })}

  &::after{
    ${whenProp({
    'loading': css`content: '';${loadingAnimation}`
  })}
  }

  
`

function whenProp (obj) {
  return props => Object.keys(obj).reduce((arr, key) => {
    console.log(key, 'in props')
    if (props[key]) {
      arr.push(obj[key]) 
      return arr
    }
    return arr
  }, [])
}

function rgba (fn, ...args) {
  return props => {
    if (typeof fn === 'function') {
      return _rgba(fn(props), ...args)
    } else {
      return _rgba(fn, ...args)
    }
  }  
}
