import React from 'react'
import {PageTitle, PageDescription, PageHeading, PageError, PageWrapper} from '../app-styles/page'
import {Code} from '../app-styles/text'
import Button from '../app-styles/button'
import Link from '../app-styles/link'

export default class Four04 extends React.Component {
  render () {
    return (
      <PageWrapper centered>
        <PageHeading>
          <PageTitle>404</PageTitle>
          <PageDescription>
            Page Not Found!
          </PageDescription>
          <p>
            Head back to the <Link to="/">homepage</Link>
          </p>
          
        </PageHeading>
        <PageError>ERROR</PageError>
      </PageWrapper>
    )
  }
}
