const express = require('express')
const app = express()
const connectToDB = require('./lib/connect-to-db')
const startApp = require('./util/express/start-app')
const CONFIG = require('./config')
const startup = require('./startup')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Logs
global.log = require('./lib/log')
const log = global.log

app.use(express.static(path.join(__dirname, './public/dist')))

app.use('/api/slack', require('./app/api/slack-router'))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './public/dist/index.html'))
})

async function main () {
  // Connect to mongodb
  await connectToDB(`mongodb://${CONFIG.MONGO.USER}:${CONFIG.MONGO.PASS}@ds137812.mlab.com:37812/blksh`)

  // The server instance
  const listener = await startApp(app, 3000)

  // Log server info
  log`${CONFIG.NAME} started on port ${listener.address().port}!`

  await startup()
}

main().catch(_ => {
  log.error('MAIN')
})
