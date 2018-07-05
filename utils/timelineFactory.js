function timelineFactory(){
  let cancel = false

  return function timeline(){
    if(typeof cancel === 'function') cancel()
    let cancelled = false

    cancel = () => {
      cancelled: true
    }

    return (timeOrPromise) => new Promise(resolve => {
      if(timeOrPromise instanceof Promise){
        timeOrPromise.then((arg) => {
          if(!cancelled){
            resolve(arg)
          }
        })
      }else{
        setTimeout(() => {
          if(!cancelled){
            resolve()
          }
        }, timeOrPromise)
      }
    })
  }
}

export default timelineFactory