import React from 'react'
import styled from 'styled-components'
import {Col, Row} from 'react-grid-system'

import {Content} from '../components/page'

import {
  PageTitle, 
  SectionHeading, 
  BodyCopy, 
  FormLabel, 
  FaintLabel
} from '../components/styles/font-styles'

import {
  primaryColour,
  secondaryColour,
  tertiaryColourLight,
  tertiaryColourMid,
  tertiaryColourDark,
} from '../vars'

const colors = [
  {name: 'primaryColour', color: primaryColour},
  {name: 'secondaryColour', color: secondaryColour},
  {name: 'tertiaryColourLight', color: tertiaryColourLight},
  {name: 'tertiaryColourMid', color: tertiaryColourMid},
  {name: 'tertiaryColourDark', color: tertiaryColourDark},
]

const ColorBlock = styled.div`
  width: 100px;
  height: 100px;
  background: ${props => props.color};
`

class StyleIndex extends React.Component{
  render(){
    return (
      <Content>
        <SectionHeading>Font styles</SectionHeading>
        <PageTitle>Page Title</PageTitle>
        <SectionHeading>Section Heading</SectionHeading>
        <BodyCopy>Body Copy</BodyCopy>
        <FormLabel>Form Label</FormLabel>
        <FaintLabel>Faint Label</FaintLabel>

        <hr/>
        <SectionHeading>Colours</SectionHeading>
        <Row>
          {
            colors.map(
              color => (
                <Col xs={3}>
                  <ColorBlock color={color.color}/>
                  <span>{color.name}</span>
                </Col>
              )
            )
          }
        </Row>
      </Content>
    )
  }
}

export default StyleIndex