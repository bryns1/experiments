function whenProp (obj) {
  return props => Object.keys(obj).reduce((arr, key) => {
    if (props[key]) {
      arr.push(obj[key]) 
      return arr
    }
    return arr
  }, [])
}

export default whenProp
