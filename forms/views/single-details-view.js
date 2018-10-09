import React from 'react'

// General Components
import Accordian from '../components/accordian'
import { Content } from '../components/page'

import {FormLabel, PageTitle} from '../components/styles/font-styles'

// Forms
import SingleDetailsForm from '../components/forms/single-details-form'

class SingleDetailsView extends React.Component{
  render(){
    return (
      <div>
        <PageTitle>{this.props.title}</PageTitle>
        <Content>
          <Accordian 
            label={props => <FormLabel>Account Details</FormLabel>} 
            type="individual_account"
            render={props => <SingleDetailsForm {...props}/>}
          />
        </Content>
      </div>
    )
  }
}

export default SingleDetailsView