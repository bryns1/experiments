/*
  * Usage:

  const timeline1 = timelineFactory()
  const timeline2 = timelineFactory()

  async onEvent(){
    const waitFor = timeline1()

    * If onEvent is called again the promise will never resolve. 
    * (This will still be garbage fetched)
    const fetch = await waitFor(
      fetch('google.com')
    )
  }
*/

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