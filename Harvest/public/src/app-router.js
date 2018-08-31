import React from 'react'
import CONFIG from '../../config'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './routes/home'
import FourO4 from './routes/four04'
import AuthSlack from './routes/auth-slack'

export default class AppRouter extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/auth/slack" render={props => <AuthSlack {...props}/>}/>
          <Route path="/" render={props => <Home {...props}/>}/>
          <Route path="/*" render={props => <FourO4 {...props}/>}/>
        </Switch>
      </Router>
    )
  }
}
