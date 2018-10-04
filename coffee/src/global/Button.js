import styled from 'styled-components'

const themes = {
  light: `
  background: white;
  color: rgb(32, 222, 205);
  transition: background 0.4s;
  
  &:hover{
    background: rgba(255, 255, 255, 0.95);
  }
  `,
  dark: `
  background: rgba(0,0,0,0.1);
  color: white;
  `
}

const Button = styled.div`
  background: rgba(0,0,0,0.1);
  color: white;
  ${props => themes[props.theme] || ''}
  padding: 1rem 2rem;  
  flex: ${props => props.size || 1};
  text-align: center;
  cursor: pointer;
`

export default Button