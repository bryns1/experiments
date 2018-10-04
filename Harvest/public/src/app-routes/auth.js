import React from 'react'
import connect from '../store/connect'
import store from '../store/store'
import query from 'query-string'
import CONFIG from '../../../config'

import AuthStep from '../app-components/auth-step'
import {PageTitle, PageDescription, PageHeading, PageError, PageWrapper} from '../app-styles/page'
import Button from '../app-styles/button'
import {Code} from '../app-styles/text'
import {
  linkSlack,
  linkHarvest,
  getHarvest
} from '../api'

const INITIAL = '0'
const LOADING = '1'
const DONE = '2'

const INTIIAL_STEPS = function () {
  return {
    'slack': {
      title: 'Link to Slack',
      description: 'Connect the bot to your slack ID',
      status: LOADING,
      actions: props => {
        return select(
          {
            [INITIAL]: <p>Please use `/{CONFIG.NAME} link` to use this page</p>,
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
            [INITIAL]: <Button onClick={e => linkHarvest(this.props.user)}>Link</Button>,
            [LOADING]: <Button disabled loading>Getting Harvest Tokens</Button>,
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
            [INITIAL]: <Button onClick={this.setupPreferences}>Setup Preferences</Button>,
            [LOADING]: <Button disabled loading>Linking</Button>,
            [DONE]: <p>Done!</p>
          },
          props.status
        )
      }
    }
  }
}

class Auth extends React.Component {
  constructor () {
    super()
    this.state = {
      steps: INTIIAL_STEPS.apply(this)
    }
  }
  async componentDidMount () {
    const q = query.parse(window.location.search)
    this.queryUser = q.u

    if (q.u) {
      const u = decode(q.u)
      const slackUser = {
        slackId: u.id,
        slackName: u.name
      }

      const userID = await linkSlack(slackUser)
      this.update('slack', {status: DONE})
      this.update('harvest', {status: LOADING})
      store.setState({
        user: userID
      })

      const hasHarvest = await getHarvest(userID)
      if (hasHarvest) {
        this.update('harvest', {status: DONE})
      } else {
        this.update('harvest', {STATUS: INITIAL})
      }
    }
  }
  
  update (what, update) {
    this.setState({
      steps: {
        ...this.state.steps,
        [what]: {
          ...this.state.steps[what],
          ...update
        }
      }
    })
  }
  render () {
    console.log(this.state.steps)
    if (!this.props.user) {
      return WithoutUser.apply(this)
    }
    return WithUser.apply(this)
  }
}

function WithUser () {
  return (
    <PageWrapper>
      <PageHeading mb={80}>
        <PageTitle mb={10}>Setup Accounts</PageTitle>
        <PageDescription>
          Setup your Slack and Harvest accounts to sync with the bot
        </PageDescription>
      </PageHeading>
      {Object.entries(this.state.steps).map(([key, step], i, arr) => <AuthStep {...step} disabled={i !== 0 && arr[i - 1][1].status !== DONE} key={key} index={i + 1}/>)}
    </PageWrapper>
  )
}

function WithoutUser () {
  return (
    <PageWrapper centered>
      <PageHeading>
        <PageTitle>401</PageTitle>
        <PageDescription>
        No Slack User Found</PageDescription>
        <p>Use <Code>/harvest link</Code> in slack to link your accounts</p>
      </PageHeading>
      <PageError>ERROR</PageError>
    </PageWrapper>
  )
}

function select (obj, test, def) {
  if (typeof obj[test] !== 'undefined') {
    return obj[test]
  } else {
    if (def) return def
    if (obj.DEFAULT || obj._default) return obj.DEFAULT || obj._default
  }
}

function decode (str) {
  return JSON.parse(window.atob(str))
}

const mixin = state => ({user: state.user})
export default connect(mixin)(Auth)
