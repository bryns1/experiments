import React from 'react'
import styled from 'styled-components'

import Form from '../util/form'

import {InputLabel, InputWrapper, InputSubLabel} from './input'
import LocationInput from './input-location/input-location'
import {Row, Col} from 'react-grid-system'
import CountryInput from './input-country/input-country';
import TaxCountries from './tax-countries'
import FileInput from './input-file/input-file'

import {FormLabel, FaintLabel} from './styles/font-styles'



const form = Form()

export default class FormElements extends  React.Component{
  constructor(){
    super()

    this.state = {
      form: form()
    }


    // Listen to form
    this.form = form.listen(formState => {
      this.setState({
        form: formState
      })
    })
  }
  FileInput = props => <FileInput {...props} name={props.name} onChange={this.update}/>
  TaxCountries = props => <TaxCountries controller={this} {...props}/>
  SelectState = props => {
    const states = ['NSW', 'ACT', 'WA', 'SA', 'TAS', 'NT', 'QLD']
    return (
      <InputWrapper>
        {props.label && <FormLabel>{props.label}</FormLabel>}
        {props.subLabel && <FaintLabel>{props.subLabel}</FaintLabel>}
        <select name={props.name} defaultValue="" onChange={this.update}>
          <option value="" disabled>State</option>
          <option value="NSW">NSW</option>
          <option value="ACT">ACT</option>
          <option value="WA">WA</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          <option value="NT">NT</option>
          <option value="QLD">QLD</option>
        </select>
      </InputWrapper>
    )
  }
  Select = props => {
    const options = props.options.map(option => {
      const [value, label] = option.split(':')
      const result = {
        label: label || value,
        value: value,
      }
      return result
    })

    return (
      <InputWrapper>
        <label>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <select name={props.name} defaultValue="" onChange={this.update}>
            <option value="" disabled>Select</option>
            {options.map(
              ({label, value}) => <option key={value+label} value={value}>{label}</option>
            )}
          </select>
        </label>
      </InputWrapper>
    )
  }
  StyledRadio = props => <StyledRadio {...props} onChange={this.update}/>
  Checkbox = props => (
    <InputWrapper>
      <label>
        <input name={props.name} type="checkbox" defaultChecked={props.checked} onChange={e => {
          this.update({
            target: {
              value: e.target.checked,
              name: props.name
            }
          })
        }}/>
        {props.label && <span>{props.label}</span>}
      </label>
    </InputWrapper>
  )
  Location = props => <LocationInput {...props} onChange={this.update}/>
  Country = props => <CountryInput {...props} onChange={this.update}/>
  Input = props => {
    const {isOptional, label, subLabel, ...rest} = props
    return (
      <InputWrapper>
        <label>
          {label && <InputLabel {...{isOptional, label}}/>}
          {subLabel && <InputSubLabel {...{isOptional, subLabel}}/>}
          <input type="text" onChange={this.update}  {...rest}/>
        </label>
      </InputWrapper>
    )
  }
  Radio = props => {
    const options = props.options.map(option => {
      const [value, label] = option.split(':')
      const result = {
        label: label || value,
        value: value,
      }
      return result
    })

    return (
      <InputWrapper>
        {props.label}
        <form onChange={this.update}>
          {
            options.map(
              ({label, value}, i) => (
                <label key={i + value}>
                  <input 
                  type="radio"
                  value={value} 
                  defaultChecked={this.val(props.name, props.value) === value} 
                  name={props.name}
                  />
                  <span>{label}</span>
                </label>
              )
            )
          }
        </form>
      </InputWrapper>
    )
  }
  Date = props => {
    const {Input} = this
    return (
      <Row>
        <Col sm={2}>
          <Input
          subLabel="DD"
          name="date_dd"
          />
        </Col>
        <Col sm={2}>
          <Input
          subLabel="MM"
          name="date_mm"
          />
        </Col>
        <Col sm={2}>
          <Input
          subLabel="YY"
          name="date_yy"
          />
        </Col>
      </Row>
    )
  }

  componentWillUnmount(){
    this.form()
  }

  update = e => {
    form.setState({
      [this.name + e.target.name]: e.target.value
    })
  }

  set = (name, value) => {
    form.setState({
      [this.name + name]: value
    })
  }

  val = (name, def) => typeof this.state.form[this.name + name] !== 'undefined' 
    ? this.state.form[this.name + name]
    : def

  extVal = (name, def) => typeof this.state.form[name] !== 'undefined'
    ? this.state.form[name]
    : def
}


export class FormState extends React.Component{
  constructor(){
    super()
    this.state = {
      form: form()
    }


    this.form = form.listen(formState => {
      this.setState({
        form: formState
      })
    })
  }

  componentWillUnmount(){
    this.form()
  }

  render(){
    return <Pre>{JSON.stringify(form(), null, 2)}</Pre>
  }
}

const Pre = styled.pre`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 12px;
  z-index: 2;
  background: #212121;
  padding: 4px;
  color: white;
  opacity: 0.2;
  max-height: 20vh;
  overflow-y: auto;

  &:hover{
    opacity: 0.8;
  }
`