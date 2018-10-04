import React from 'react';

const BaseElement = props => {
  return <div>This is the {props.name || 'base'} element</div>
}

const proxy = new Proxy(BaseElement, {
  get: (target, prop) => {
    return props => <BaseElement name={prop}/>
  }
})

export default proxy