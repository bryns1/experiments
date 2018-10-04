import React from 'react'
import styled from 'styled-components'
import { connect } from '../../hoc/stateComponents'
import {
  TransitionGroup,
  Transition
} from 'react-transition-group'
import {Grid, Row, Col} from 'react-flexbox-grid'
import anime from 'animejs'
import $ from 'jquery'

class HeaderText extends React.Component{
  render(){

    return (
      <Grid fluid>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Relative>
              <TransitionGroup component={null}>
                <AnimatedText {...this.props} key={this.props.headerText} duration={1000} delay={100}/>
              </TransitionGroup>
            </Relative>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const Relative = styled.div`
  position: relative;
  min-height: 80px;
`

class AnimatedText extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      words: this.props.headerText.split(' ').map(word => ({word, ref: React.createRef()})),
    }
    this.parent = React.createRef()
  }
  componentDidMount(){
    this.setState({
      words: this.props.headerText.split(' ').map(word => ({word, ref: React.createRef()})),
    })
  }
  onEnter(){
    const refs = this.state.words.map(w => w.ref.current).filter(x => x)
    anime.remove(refs)
    anime({
      targets: refs,
      translateY: ['-100%', 0],
      easing: 'easeOutQuart',
      duration: this.props.duration,
      delay: (el, i) => (refs.length * this.props.delay - this.props.delay * i) + 600
    })
  }
  onExit(){
    const refs = this.state.words.map(w => w.ref.current).filter(x => x)
    $(this.parent.current).css({
      position: 'absolute',
      width: '100%',
      height: 'auto',
      top:0,
      left: 0,
    })
    anime.remove(refs)
    anime({
      targets: refs,
      translateY: '100%',
      duration: this.props.duration,
      easing: 'easeOutQuart',
      delay: (el, i) => i * this.props.delay
    })
  }
  render(){
    this.refs = []
    return (
      <Transition in={this.props.in} unmountOnExit appear onEnter={() => this.onEnter()} onExit={() => this.onExit()} timeout={this.props.duration + this.props.delay * this.state.words.length}>
       <TheText innerRef={this.parent}>
       {
         this.state.words.map(({word, ref}, i) => {
           return (
            <AnimatedTextParent key={this.props.headerText + word + i} {...this.state}>
              <div ref={ref}>
                {word}
              </div>
            </AnimatedTextParent>
           )
         })
       }
       </TheText>
      </Transition>
    )
  }
}

const AnimatedTextParent = styled.span`
  display: inline-block;
  overflow: hidden;
  margin-right: 0.25em;
`

const TheText = styled.h2`
  text-align: center;
`

export default connect(state => {
  return {
    headerText: obj(state).get('app.headerText', '')
  }
})(HeaderText)

function obj(o){
  return {
    get: (key, initial) => {
      return key.split('.').reduce((target, key) => {
        if(target && target[key]){
          return target[key]
        }else{
          return false
        }
      }, o) || initial
    }
  }
}