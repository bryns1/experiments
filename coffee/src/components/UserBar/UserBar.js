import React from 'react'
import styled from 'styled-components'
import { Transition, TransitionGroup } from 'react-transition-group'
import Hammer from '../../global/Hammer'
import anime from 'animejs'
import UserInfo from './Userinfo'
import setHeaderText from '../../hoc/setHeaderText'
import {connect} from '../../hoc/stateComponents'
import {capitolise} from '../../../util'

class UserBar extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      havingCoffee: false,
      deltaY: 0,
      height: 0
    }
    this.height = 0
    this.ref = React.createRef()
  }
  componentDidMount(){
    this.resize()
  }
  resize = () => {
    this.rect = this.ref.current.getBoundingClientRect()
  }
  toggleCoffee = () => {
    // this.setState({havingCoffee: !this.state.havingCoffee})
  }
  onEnter = () => {
    anime.remove(this.ref.current)
    anime({
      targets: this.ref.current,
      duration:  600,
      delay: this.props.delay,
      scale: [0.9, 1],
      opacity: [0, 1],
      translateY: [10, 0],
      easing: 'easeOutQuart'
    }).finished.then(() => {
    this.ref.current.style = "transition: transform 0.6s, background 0.3s;"
   })

  }
  onExit = () => {
    anime.remove(this.ref.current)
    anime({
      targets: this.ref.current,
      delay: this.props.delay,
      duration: 300,
      scale: [1, 0.9],
      opacity: [1, 0],
      translateY: [0, -10],
    })
    this.ref.current.style = "transition: transform 0.2s, background 0.2s;"
  }
  onPress = (e) => {
    console.log(e.center)
    this.pressing = e.center
    this.setState({
      pressing: true
    })
  }
  activate = () => {
    this.props.dispatch({
      type: "SELECT_USER",
      payload: this.props.user.name
    })
  }
  touchMove = (e) => {
    
    if(this.pressing){
      if(this.state.height > 240){
        this.setState({
          height: 0,
          active: true,
          pressing: false
        })
        this.pressing = false
        this.activate()
      }else{
        this.setState({
          height: Math.max(this.rect.height, this.rect.height + (e.touches[0].clientY - this.pressing.y) * 0.65)
        })
      }
    }
  }
  touchStart = e => {
    if(this.props.selectedUser === this.props.user.name){
      this.props.dispatch({
        type: 'SELECT_USER',
        payload: ''
      })
    }
  }
  touchEnd = e => {
    this.setState({
      height: 0,
      pressing: false
    })
    this.pressing = false
  }
  render(){
    const Comp = () => setHeaderText(capitolise(this.props.user.name) + "'s debt by the numbers")(UserInfo)
    return (
      <Transition onEnter={() => this.onEnter()} appear onExit={() => this.onExit()} timeout={this.props.delay + this.props.duration} in={this.props.in}>
        <Hammer onPress={e => this.onPress(e)} onTouchStart={e => this.touchStart(e)} onTouchEnd={e => this.touchEnd()} onTouchMove={e => this.touchMove(e)}>
          <Bar innerRef={this.ref} selected={this.state.selected} h={this.state.height} className={classes({'pressing': this.state.pressing})} onClick={() => this.toggleCoffee()}>
            <Flex>
            <Name>{this.props.user.name}</Name>
            <FlexPad/>
            {this.state.purchasing && <Checkbox className="checkbox" active={this.state.havingCoffee}/>}
            </Flex>
            <TransitionGroup component={'div'}>
              {this.props.selectedUser === this.props.user.name && (<Comp user={this.props.user}/>)}
            </TransitionGroup>
          </Bar>
        </Hammer>
      </Transition>
    )
  }
}

const Flex = styled.div`
  display: flex;
`

const Name = styled.h2`
  color: ${props => props.ghost ? "transparent" : 'black'};
  background: ${props => props.ghost ? 'rgba(0,0,0,0.03)' : 'transparent'};
`

const Bar = styled.div`
  padding: 16px;
  background: ${props => props.active ? '#F4F4F4' : "white"};
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  border: solid 1px #F4F4F4;
  height: ${p => p.h ? `${p.h}px` : 'auto'};
  color: black;
  display: block;
  position: relative;
  overflow: hidden;

  &.pressing{
    transform: scale(0.95);
    background: rgba(240, 240, 240, 1);
  }

  
  &:hover{
    .checkbox{
      background: #ebebeb;
      transform: scale(1.1);
    }
  }
  &:active{
    .checkbox{
      transition: transform 0.1 s, background 0.1 s;
      background: #ebebeb;
      transform: scale(0.9)
    }
  }
`

const FlexPad = styled.div`
  flex: 1;
`

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.active ? "#20DECD !important" : "#F4F4F4"};
  transition: transform 0.3s, background 0.3s;
  border-radius: 2px;
`

function classes(obj){
  return Object.entries(obj).reduce((acc, [key, val]) => {
    return acc + (val ? key : '')
  }, '')
}
function diffObject(ob1, ob2, num){
  
  const ob1Keys = Object.keys(ob1)
  const ob2Keys = Object.keys(ob2)

  if(ob1Keys.length !== ob2.length){
    return false
  }

  if(ob1Keys.find(key => typeof ob2Keys[key] === 'undefined')){
    return false
  }

  return ob1Keys.reduce((num, key) => {
    return num + Math.abs(ob1[key] - ob2[key])
  }, 0) > num || 0
}

export default connect(state => {
  console.log(state)
  return {
    selectedUser: state.app && state.app.selectedUser,
    user: state.user
  }
})(UserBar)