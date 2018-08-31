import { Children } from 'react'
import { withTheme, injectGlobal } from 'styled-components'

const GlobalComponent = (fn) => {
  let oldStyle = false
  return withTheme(props => {
    const styles = fn(props, css)

    if (styles !== oldStyle) {
      injectGlobal`${styles}`
      oldStyle = styles
    }

    return Children.only(props.children)
  })
}

export default GlobalComponent

function css (...args) {
  return String.raw(...args)
}
