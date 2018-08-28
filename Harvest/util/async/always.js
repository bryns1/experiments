function always(promise){
  return new Promise(resolve => {
    promise.then(data => {
      resolve({
        data,
      })
    })
    .catch(err => {
      resolve({
        error: err,
        data: false
      })
    })
  })
}

module.exports = always