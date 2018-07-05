function clump(g){
  return function(arr){
    return arr.reduce(function(res, x, i){
      var currentIndex = Math.floor(i / g)
      if(!res[currentIndex]){
        res[currentIndex] = []
      }
      res[currentIndex].push(x)
      return res
    }, [])
  }
}

export default clump