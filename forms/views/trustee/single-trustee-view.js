import React from 'react'

import FakeLink from '../../components/fake-link'
import { Sidebar, SidebarLinks } from '../../components/page';

import { PageTitle } from '../../components/styles/font-styles';

import {trusteeRoutes} from '../../router.config'

class SingleTrusteeView extends React.Component{
  render(){
    return (
      <div>
        Single TrusteeView
        <Sidebar>
          <PageTitle>New SMSF Account</PageTitle>
          <SidebarLinks routes={trusteeRoutes}/>
          <ul>
            <li>
              <FakeLink>Save & Exit</FakeLink>
            </li>
          </ul>
        </Sidebar>
      </div>
    )
  }
}

export default SingleTrusteeView