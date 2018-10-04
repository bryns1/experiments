import GlobalStyles from './global-styles'

export default GlobalStyles((props, css) => css`
  *{
    box-sizing: border-box;
  }
  body{
    background: ${props.theme.bg};
    font-size: 12px;
    font-family: sans-serif;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    color: ${props.theme['body-copy']};
  }
`)
