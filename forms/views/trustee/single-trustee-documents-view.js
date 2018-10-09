import React from 'react'
import { PageTitle } from '../../components/styles/font-styles';
import {Sidebar, SidebarLinks, Content} from '../../components/page'
import FakeLink from '../../components/fake-link'
import DocumentsForm from '../../components/forms/documents-form'
import {trusteeRoutes} from '../../router.config'

class SingleTrusteeDocumentsView extends React.Component{
  render(){
    return (
      <div>
        <PageTitle>{this.props.title}</PageTitle>
        <Content>
          <DocumentsForm/>
        </Content>
        <Sidebar>
          <PageTitle>{this.props.title}</PageTitle>
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

export default SingleTrusteeDocumentsView