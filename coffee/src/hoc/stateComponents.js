import React from 'react'

const { Provider, Consumer } = React.createContext()

function is(x, y) {
  // SameValue algorithm
  if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
  } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
  }
}

/**
* Performs equality by iterating through keys on an object and returning false
* when any key has values which are not strictly equal between the arguments.
* Returns true when the values of all keys are strictly equal.
*/
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
      return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
      return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
      if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
          return false;
      }
  }

  return true;
}

export default class StoreProvider extends React.Component{
  state = {
    state: {},
    store: {}
  }
  componentDidMount(){
    this.updateState()
    this.props.store.subscribe(this.updateState)
  }
  updateState = () => {
    this.setState({state: this.props.store.getState(), store: this.props.store})
  }
  
  componentWillUpdate(newProps, newState){
    return shallowEqual(this.props, newProps) && shallowEqual(this.state, newState)
  }
  render(){
    return (
    <Provider value={this.state}>
      {this.props.children}
    </Provider>
    )
  }
}

class Connect extends React.Component{
  componentDidUpdate(newProps){
    return shallowEqual(newProps, this.props)
  }
  render(){
    console.log(props)
    return this.props.render(this.props)
  }
}

export const connect = fn => Comp => () => (
  <Consumer>
    {ctx => <Connect state={ctx} render={(props) => (<Comp {...fn(ctx.state, props)} dispatch={ctx.store.dispatch} {...props}/>)}/>}
  </Consumer>
)