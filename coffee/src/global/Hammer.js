import React from 'react'
import Hammer from 'hammerjs'
import {removeProps} from '../../util'

const events = [
  'Pan',
  'Pinch',
  'Press',
  'PressUp',
  'Rotate',
  'Swipe',
  'Tap'
]

const hammerEvents = events.map(e => e.toLowerCase())


class HammerComponent extends React.Component{
  constructor(props){
    super(props)
    this.ref = React.createRef()

    this.events = events.reduce((acc, evt) => {
      acc[evt] = this.props['on'+evt]
      return acc
    }, {})

    
    this.events = filterObject(this.events, val => typeof val === 'function')
    console.log(this.events)
  }
  componentDidMount(){
    this.hammerTime = new Hammer(this.ref.current)

    this.listeners = Object.keys(this.events).map(evt => {
      return this.hammerTime.on(evt.toLowerCase(), this.events[evt])
    })
  }
  componentWillUnmount(){
    this.hammerTime.destroy()
  }
  render(){
    return (
      <span {...removeProps(this.props, events.map(e => 'on'+e))} ref={this.ref}>{this.props.children}</span>
    )
  }
}



function filterObject(obj, predicate){
  const keys = Object.keys(obj)
  return keys.filter(key => predicate(obj[key], key)).reduce((acc, k) => {
    acc[k] = obj[k]
    return acc
  }, {})
}

function capitolize(s){
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default HammerComponent