import React from 'react'

import Wrapper from './wrapper'
import {Row, Col} from 'react-grid-system'

import valueIs from '../util/tests/value-is'

import {not} from '../util/tests/operators'



class TaxCountries extends React.Component{
  state = {
    countries: [0]
  }
  addCountry = e => {
    e.preventDefault()
    this.setState(state => {
      return {
        countries: [
          ...state.countries,
          state.countries.length
        ]
      }
    })
  }
  render(){
    const controller = this.props.controller
    if (!controller) return null

    const {Input, Country, Checkbox, Select} = controller

    const countries = this.state.countries.map(country => {
      return (
        <div key={country}>
          <Row>
          <Col xs={5}>
            <p>Country of foreign tax residence</p>
            <Country name={'country_of_foreign_tax'+country}/>
          </Col>
          <Col xs={6}>
            <Wrapper
            hiddenWhen={valueIs(true)}
            val={controller.val('no_tin_number'+country, false)}
            >
              {/* Shown when user has TIN number */}
              <Input name={"tin_number"+country} label="Taxpayer identification number (TIN)"/>
            </Wrapper>
            <Wrapper
            hiddenWhen={valueIs(false)}
            val={controller.val('no_tin_number'+country, false)}
            >
              {/* Shown when user has no TIN number */}
              <p>Country of foreign tax residence</p>
              <Select name={'reason_for_no_tn'+country} options={[
                'a:The country of tax residency does not issue TINs to tax residents',
                'b:The account holder has not been issued with a TIN',
                'c:The country of tax residency does not require the TIN to be disclosed (according to domestic law of the relevant country/jurisdiction)'
              ]}/>
            </Wrapper>
            
          </Col>
        </Row>
        <Checkbox name={"no_tin_number"+country} label="The client does not have a TIN number"/>
        <Wrapper hiddenWhen={not(valueIs('b'))} val={controller.val('reason_for_no_tn'+country, '')}>
          <Input name={"no_tin_reason"+country} label="Reason"/>
        </Wrapper>
      </div>
      )
    })
    return (
      <div>
        {countries}
        <button onClick={this.addCountry}>Add another country</button>
      </div>
    )
  }
} 

export default TaxCountries