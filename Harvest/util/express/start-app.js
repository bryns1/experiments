function startApp(app, port){
  return new Promise(resolve => {
    const listener = app.listen(port, () => resolve(listener))
  })
}

module.exports = startApp