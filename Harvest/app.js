const express = require('express')
const app = express()
const cron = require('node-cron')
const connectToDB = require('./lib/connect-to-db')
const startApp = require('./util/express/start-app')
const CONFIG = require('./config')
const startup = require('./startup')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Logs
const log = require('./lib/log')

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.use('/api/slack', require('./app/api/slack-router'))



async function main(){
  // Connect to mongodb
  await connectToDB('mongodb://127.0.0.1:27017/harvest')

  // The server instance
  const listener = await startApp(app, 3000)

  // Log server info
  log(`${CONFIG.NAME} started on port ${listener.address().port}!`)

  await startup()
}

main().catch(err => {
  log.error(err)
})