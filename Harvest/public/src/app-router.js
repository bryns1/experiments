import React from 'react'
import CONFIG from '../../config'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './app-routes/home'
import FourO4 from './app-routes/four04'
import Auth from './app-routes/auth'

export default class AppRouter extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/auth" render={props => <Auth {...props}/>}/>
          <Route path="/" exact render={props => <Home {...props}/>}/>
          <Route path="/*" render={props => <FourO4 {...props}/>}/>
        </Switch>
      </Router>
    )
  }
}
