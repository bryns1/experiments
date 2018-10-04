import React from 'react'
import AppRouter from './app-router'
import { ThemeProvider } from 'styled-components'
import StoreProvider from './store/store-provider'
import { primary, secondary } from './theme'
import { injectGlobal } from 'styled-components'
import Global from './app-components/global'

import store from './store/store'
import axios from 'axios'

export default class App extends React.Component {
  state = {
    theme: primary,
  }
  render () {
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={this.state.theme}>
          <Global>
            <AppRouter onClick={this.onClick}/>
          </Global>
        </ThemeProvider>
      </StoreProvider>
    )
  }
}

