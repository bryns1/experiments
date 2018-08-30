import React from 'react'
import CONFIG from '../../config'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './routes/home'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Route path="/auth/slack" render={props => <Home {...props}/>}/>
        </Router>
      </div>
    )
  }
}
