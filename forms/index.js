import React from 'react'
import ReactDOM from 'react-dom'

class Form {
  constructor(obj){
    this._mixObject(obj)
  }

  _mixObject(obj){
    const keys = Object.keys(obj)

    keys.forEach(k => this[k] = obj[k])
  }

  setState(obj){
    this._mixObject(obj)
    this.update()
  }

  listen(fn) {
    
  }
}

const App = () => {
  return <div>hello</div>
}

ReactDOM.render(<App/>, document.getElementById('app'))