import styled from 'styled-components'
import theme from '../../../util/elements/from-theme'

export default styled.button`
  min-height: 40px;
  border: solid 2px ${theme('green')};
  background: ${theme('green')};
  color: white;
  padding: 12px 24px;
  min-width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
  outline: none;
  font-weight: bold;

  &:hover{
    transform: translateY(-2px);
  }

  &:active{
    transition: transform 0.1s;
    transform: scale(0.95);
  }
`
