// Packages
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Imports
const config = require('./config')
const routes = require('./routes/routes.js')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'The reqested resource was not found'
  })
})

app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`)
})