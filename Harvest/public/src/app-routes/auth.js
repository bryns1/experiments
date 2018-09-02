import React from 'react'
import Wrapper from '../app-components/wrapper'
import AuthStep from '../app-components/auth-step'
import {PageTitle, PageDescription, PageHeading} from '../app-styles/page'
import CONFIG from '../../../config'
import Button from '../app-styles/button'

const INITIAL = '0'
const LOADING = '1'
const DONE = '2'

const INTIIAL_STEPS = function(){
  return {
    'slack': {
      title: 'Link to Slack',
      description: 'Connect the bot to your slack ID',
      status: LOADING,
      actions: props => {
        return select(
          {
            DEFAULT: <p>Please use `/{CONFIG.NAME} link` to use this page</p>,
            [LOADING]: <Button loading>Linking</Button>,
            [DONE]: <p>Done!</p>
          },
          props.status
        )
        
      }
    },
    'harvest': {
      title: 'Link to Harvest',
      description: 'Link your slack ID to Harvest',
      status: INITIAL,
      actions: props => {
        return select(
          {
            DEFAULT: <Button onClick={this.linkHarvest}>Link</Button>,
            [LOADING]: <Button disabled loading>Linking</Button>,
            [DONE]: <p>Done!</p>
          },
          props.status
        )
      }
    },
    'setup': {
      title: 'Setup preferences',
      description: 'Setup your account preferences',
      status: INITIAL,
      actions: props => {
        return select(
          {
            DEFAULT: <Button onClick={this.setupPreferences}>Setup Preferences</Button>,
            [LOADING]: <Button disabled loading>Linking</Button>,
            [DONE]: <p>Done!</p>
          },
          props.status
        )
      }
    },
  }
}

export default class Auth extends React.Component {
  constructor () {
    super()
    this.state = {
      steps: INTIIAL_STEPS.apply(this)
    }
  }
  linkSlack = () => {
    
  }
  linkHarvest = () => {

  }
  setupPreferences
  render () {
    return (
      <Wrapper>
        <PageHeading mb={80}>
          <PageTitle mb={10}>Setup Accounts</PageTitle>
          <PageDescription>
            Setup your Slack and Harvest accounts to sync with the bot
          </PageDescription>
        </PageHeading>
        {Object.entries(this.state.steps).map(([key, step], i, arr) => <AuthStep {...step} disabled={i !== 0 && !arr[i-1].complete} key={key} index={i+1}/>)}
      </Wrapper>
    )
  }
}


function select(obj, test, def){
  if (typeof obj[test] !== 'undefined'){
    return obj[test]
  } else {
    if (def) return def
    if (obj.DEFAULT || obj._default) return obj.DEFAULT || obj._default
  }
}