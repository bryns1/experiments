// NPM Modules
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// General Components
import { Page, Inner, Header, Sidebar, Nav } from './components/page'
import { FormState } from './components/form-elements'

// Views
import SingleDetailsView from './views/single-details-view'
import SingleTrusteeView from './views/single-trustee-view'
import StyleIndex from './views/style-index'

import {routerConfig} from './router.config'

class App extends React.Component{

  componentDidMount(){
    console.clear()
    const d = new Date()
    console.log(`Mounted @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
  }

  componentDidCatch(error, info){
    console.log('App threw error', error)
  }

  render(){

    return (
      <Page>
        <Header/>
        <Nav/>
        <Inner>
          <FormState/>
          <Router>
            <Switch>
              {
                routerConfig.map((routeObj) => {
                  return (
                    <Route path={routeObj.path} render={routeObj.component}/>
                  )
                })
              }
            </Switch>
          </Router>
        </Inner>        
      </Page>
    )
  }
}

export default App