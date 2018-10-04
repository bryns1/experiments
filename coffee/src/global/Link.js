import React from 'react'
import { withRouter } from 'react-router-dom'

const nav = (props, e) =>{
  console.log(props)
  if(!props.to.includes('http')){
    e.preventDefault()
    props.history.push(props.to, {...window.history})
  }
}

const Link = props => {
  return (
    <a onClick={e => nav(props, e)} href={props.to}>{props.children}</a>
  )
}

export default withRouter(Link)