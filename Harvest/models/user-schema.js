const { Schema, model } = require('mongoose')
const searchObjects = require('../util/objects/')

const Harvest = require('../app/harvest-api')
const Slack = require('../app/slack-api')

const UserSchema = new Schema({
  name: String,
  slackId: String,
  harvestId: String,
})

const statics = {
  getTimesheets(query){
    return Harvest.getTimesheets(this.harvestId)
    .then(timesheets => searchObjects(timesheets, query))
  }
}

const methods = {
  sendMessage(msg){
    return Slack.sendMessage(this.slackId, msg)
  }
}

applyToSchema(
  UserSchema,
  { statics, methods }
)


module.exports = model('User', UserSchema)

function applyToSchema( schema, object = {statics: {}, methods: {}} ){

  const m = mustBeObject(methods)
  const s = mustBeObject(statics)

  Object.keys(object)
  .forEach(key => assign(schema[key], object[key]))
  
}

function assign(item, obj){
  Object.keys(obj).forEach(key => {
    item[key] = obj[key] 
  })
}

function mustBeObject(obj){
  return isObject(obj) ? obj : {}
}

function isObject(obj){
  return typeof obj === 'object' && obj !== null
}