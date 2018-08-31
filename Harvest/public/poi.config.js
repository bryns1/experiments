module.exports = {
  devServer: {
    index: '',
    proxy: {
      '/': 'http://localhost:3000'
    }
  }
}
