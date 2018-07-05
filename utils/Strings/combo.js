function createCombo(...args){
  
  function doStep(acc, arr){
    return function (add){
      acc.length 
        ? acc.forEach(function(item){
          arr.push(item + add)
        })
        : arr.push(add)
    }
  }
  return args.reduce(function(acc, val){
    var arr = []
    if(Array.isArray(val)){
      val.forEach(doStep(acc, arr))
    }else{
      doStep(acc, arr)(val)
    }
    return arr
  }, [])
}

function combos(strings = [], ...arrays){  
  const res = []

  strings.forEach((string, i) => {
    res.push(string)
    if(arrays[i]){
      if(Array.isArray(arrays[i])) res.push(arrays[i])
      // Regex matches commas that arent preceded by a hashtag
      if(typeof arrays[i] === 'string') res.push(arrays[i].split(/(?<!#),/).map(replace(/#,/, ',')))
    }
  })

  function replace(...args){
    return (str) => str.replace(...args)
  }

  return createCombo(...res.filter(Boolean))
}

combos.create = createCombo

export default combos