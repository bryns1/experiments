/* 
  The Wrapper shows or hides elements based 
  off a value and a comparison

  The wrapper is passed a `val` prop which is the value to be checked
  and it is passed a `hiddenWhen` prop which expects a function
  the comparison function is passed the current `val`. If the function
  returns true the Wrapper will be hidden otherwise it will be visible 
*/

const Wrapper = props => {

  /* 
    Optional debug prop
  */
  if (props.log) {
    console.log(props.val, props.hidden(props.val))
  }

  /*
    Wrapper can be passed an object to the `renders` prop
    The wrapper will treat each key of the object to a case
    if the current `val` matches the case, that element will show
   */
  if (props.renders && props.renders[props.val]) {
    // Render object
    return props.renders[props.val](props)
  } else if (props.hiddenWhen && !props.hiddenWhen(props.val)) {
    return props.children || null
  } else {
    return null
  }
}

export default Wrapper