import React from 'react'
import AppRouter from './app-router'
import { ThemeProvider } from 'styled-components'
import { Provider as StateProvider } from 'react-redux'
import { primary, secondary } from './components/theme'
import { injectGlobal } from 'styled-components'
import Global from './components/global'

import store from './store/store'
import axios from 'axios'

export default class App extends React.Component {
  state = {
    theme: primary,
  }
  render () {
    return (
      <StateProvider store={store}>
        <ThemeProvider theme={this.state.theme}>
          <Global>
            <AppRouter onClick={this.onClick}/>
          </Global>
        </ThemeProvider>
      </StateProvider>
    )
  }
}
