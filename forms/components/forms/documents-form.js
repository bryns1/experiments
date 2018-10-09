import React from 'react'

import FormElements from '../form-elements';
import { FormLabel } from '../styles/font-styles';
import InlineAccordian from '../accordian-inline'

let index = 0

class DocumentsForm extends FormElements{
  constructor(props){
    super(props);
    this.name = 'documents_form_' + (props.key || index++) + '_'
  }
  render(){
    const {FileInput} = this
    return (
      <div>
        <FormLabel>Trust Deeds</FormLabel>
        <InlineAccordian label='Requirements' render={props => <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet tempor lectus.</p>}/>
        <FileInput name="file_input"/>
      </div>
    )
  }
}

export default DocumentsForm