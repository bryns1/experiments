const users = require('../models/user-schema')

// Every weekday at 5:45
cron.schedule('45 17 * * 1-5', async () => {
  // Message users telling them that their timers will be stopped
  const users = await users.find()

  await asyncMap(
    users,
    async user => {
      await user.getTimesheets({ 'is_running': true })

      user.sendMessage()
    }
  )
})

cron.schedule('9 30 * * 1-5', async () => {
  const users = await users.find()


})

function asyncMap(items, fn){
  return Promise.all(items.map(fn))
}