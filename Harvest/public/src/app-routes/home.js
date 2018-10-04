import React from 'react'
import { Link } from 'react-router-dom'
import {
  PageHeading, 
  PageTitle, 
  PageDescription, 
  PageWrapper,
  PageError
} from '../app-styles/page'
import Button from '../app-styles/button'
import CONFIG from '../../../config.json'

function method (name, fn) {
  return {
    name, fn
  }
}

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      methods: [
        method('Get active Harvest entries')
      ]
    }
  }
  render () {
    return (
      <PageWrapper>
        <PageHeading mb="48px">
          <PageTitle fontSize="70px" mb="80px" mt="20px">{CONFIG.NAME}</PageTitle>
          <PageDescription>Functional Exciting Dialogue 🌟🔥🙌</PageDescription>
        </PageHeading>
        <Button width="100%">Murder the api</Button>
        <PageError>NOT AN ERROR</PageError>
      </PageWrapper>
    )
  }
}
