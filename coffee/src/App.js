import React from 'react'
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom'
import styled from 'styled-components'
import { store } from '../store/store'

import Header from './components/Header/Header'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
// import Shout from './pages/Shout'
import SplashPage from './components/SplashPage/SplashPage'
import HeaderText from './components/HeaderText/HeaderText'
import StoreProvider from './hoc/stateComponents'
// import { db } from '../fire'

window.store = store

class App extends React.Component{
  render(){
    return (
      <StoreProvider store={store}>
        <AppOuter bg={'#292C31'} color={'white'}>
          <SplashPage/>
          <Router>
            <Switch>
              <Route path="/" exact render={props => <Scaffold><Home {...props}/></Scaffold>}/>
            </Switch>
          </Router>
        </AppOuter>
      </StoreProvider>
    )
  }
}

const Scaffold = props => {
  const Head = () => props.header ? (typeof props.header === 'function' ? props.header(props) : null) : (
    <>
      <Header>
        <SiteLogo>CAFFIENAT<strong>ED.</strong></SiteLogo>
      </Header>
      <HeaderText/>
    </>
  )
  const Foot = () => props.footer ? (typeof props.header === 'function' ? props.header(props) : null) : null
  return (
    <>
    <Head/>
      <AppInner>
        {props.children}
      </AppInner>
    <Foot/>
    </>
  )
}


const SiteLogo = styled.span`
  font-size: 12px;
`

const AppOuter = styled.div`
  display:flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background 0.6s;
  background-color: ${p => p.bg};
  color: ${p => p.color};
`

const AppInner = styled.div`
  flex: 1;
  position: relative;
`


export default App