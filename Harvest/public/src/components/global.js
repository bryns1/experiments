import GlobalStyles from './global-styles'

export default GlobalStyles((props, css) => css`
body{
  background: ${props.theme.bg};
}
`)
