import GlobalStyles from './global-styles'

export default GlobalStyles((props, css) => css`
  *{
    box-sizing: border-box;
  }
  body{
    background: ${props.theme.bg};
    font-size: 12px;
    font-family: sans-serif;
    color: ${props.theme['body-copy']};
  }
`)
