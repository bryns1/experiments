import React from 'react'
import styled from 'styled-components'
import countries from './countries'

import {FormLabel} from '../styles/font-styles'

const CountryWrapper = styled.div``

class CountryInput extends React.Component{
  render(){
    return (
      <CountryWrapper>
        {this.props.label && <FormLabel>{this.props.label}</FormLabel>}
        <select name={this.props.name} onChange={this.props.onChange}>
          <option value="AU">Australia</option>
          <option value="NZ">New Zealand</option>
          <option value="" disabled>=============================</option>
          {
            countries.map(
              (country, i) => <option key={country.code + country.name} value={country.code}>{country.name}</option>
            )
          }
        </select>
      </CountryWrapper>
    )
  }
}

export default CountryInput