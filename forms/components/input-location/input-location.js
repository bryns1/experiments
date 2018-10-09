import React from 'react'
import styled from 'styled-components'
import searcher from './mock-data'
import {Flex, FlexItem} from '../flex'
import {Row, Col} from 'react-grid-system'

const InputEl = styled.input`
  width: 100%;
`

const SuggestionWrapper = styled.div`
  background: white;
  box-shadow: 0px 3px 16px rgba(0,0,0,0.2);
  position: absolute;
  width: 100%;
`

const Relative = styled.div`position: relative;`

const Location = styled.div`
  padding: 12px 20px;

  &:hover{
    background: lightgrey;
  }
`

class LocationInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: props.value || '',
      results: [],
      isAus: true,
      searching: false,
      hasEscaped: false,
    }
  }

  change = e => {
    e.preventDefault()
    const val = e.currentTarget.value
    this.set(val)
  }

  set = val => {
    // Create a dom like event (to simulate a real dom input)
    const target = {
      name: this.props.name,
      value: val
    }

    let prevented = false

    const event = {
      target,
      currentTarget: target,
      preventDefault(){
        prevented = true
      }
    }
    
    // Do changes
    this.props.onChange && this.props.onChange(event)

    // Don't continue if prevented
    if (prevented) return

    this.setState({
      value: val,
      results: searcher.search(val)
    })
  }

  focus (isFocussed) {
    this.setState({
      searching: isFocussed,
    })
  }
  toggle(prop){
    return e => {
      this.setState(state => {
        return { [prop]: typeof e === 'boolean' ? e : !Boolean( state[prop] ) }
      })
    }
  }
  render(){
    return (
      <Row>
        <Col sm={12}><span>Address cannot be a PO Box</span></Col>
        <Col sm={8}>
          <InputEl 
          onFocus={e => this.focus(true)} 
          onBlur={e => this.focus(false)} 
          onChange={this.change}
          value={this.state.value}
          name={this.props.name}
          />
          {
            this.state.results.length &&
            this.state.searching && 
            this.state.isAus && 
            !this.state.hasEscaped ? (
              <Relative>
                <SuggestionWrapper>
                  {
                    this.state.results
                    .filter((_, i) => i < 3)
                    .map(
                      result => (
                        <Location
                        key={result.address}
                        onMouseDown={e => {
                          this.set(result.address)
                        }}>
                          {result.address}
                        </Location>
                      )
                    )
                  }
                </SuggestionWrapper>
              </Relative>
          ) : null}
          <Flex>
            <FlexItem>
              <label>
                <input type="checkbox" checked={!this.state.isAus} onChange={this.toggle('isAus')}/>
                <span>Non-Australian address</span>
              </label>
            </FlexItem>
            <FlexItem right>
              {
                this.state.results.length
                && this.isAus ? (
                  !this.state.hasEscaped  
                    ? <a href="#" onClick={e => {
                      e.preventDefault()
                      this.toggle('hasEscaped')(true)
                    }}>Cant Find Address?</a>
                    : <a href="#" onClick={e => {
                      e.preventDefault()
                      this.toggle('hasEscaped')(false)
                    }}>Search for addresses?</a>
                ) : null                 
              }
            </FlexItem>
          </Flex>
        </Col>
      </Row>
    )
  }
}

export default LocationInput