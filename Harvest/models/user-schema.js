const mongoose = require('mongoose')
const {
  getTokens,
  refreshToken,
  getActiveHarvestEntries
} = require('../lib/harvest')

const log = global.log
// const searchObjects = require('../util/objects/search-objects')

const UserSchema = new mongoose.Schema({
  name: String,
  slackId: String,
  slackName: String,
  harvestId: String,
  harvestToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expires_in: Number,
    expiredBy: Number
  }
})

UserSchema.statics = {
  findOneOrCreate (condition, doc) {
    return new Promise((resolve, reject) => {
      this.findOne(condition, (_err, result) => {
        if (result) {
          return resolve(result)
        }

        log('About to create')
        this.create(doc, (err, result) => {
          if (err) return reject(err)
          return resolve(result)
        })
      })
    })
  },
  fromSlack (user) {
    return new Promise((resolve, reject) => {  
      try {
        log.warning('Waiting for user')
        this.findOneOrCreate({ slackId: user.slackId }, user).then(user => {
          resolve(user)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

UserSchema.methods = {
  async getActiveHarvestEntries () {
    const tokens = await this.getHarvestTokens()
    return getActiveHarvestEntries(tokens)
  },
  async updateHarvestTokens (tokens) {
    this.harvestToken = this.harvestToken || {}
    this.harvestToken = {
      ...this.harvestToken, 
      ...tokens,
      now: new Date().getTime(),
      expiredBy: new Date().getTime() + tokens.expires_in
    }

    // this.save() is promise like
    return this.save()
  },
  async getHarvestTokens (code) {
    if (this.harvestToken) {
      if (this.tokensAreStale(this.harvestToken)) {
        log('Tokens are stale')
        // Refresh token
        const newTokens = await refreshToken(this.harvestToken)
        return this.updateHarvestTokens(newTokens)
      } else {
        return new Promise(resolve => resolve(this.harvestToken))
      }
    } else if (code) {
      const tokens = await getTokens(code)

      return this.updateHarvestTokens(tokens)
    }
  },
  tokensAreStale (token) {
    return new Date().getTime() > token.expiredBy
  }
}

const UserModel = mongoose.model('User', UserSchema)

async function test () {
  const user = UserModel.findById('5b8c88e32a1b5f0cb864a70c')
  log(user)
  // log(`About to get harvest entries for ${user} I think`)
  // user.getActiveHarvestEntries()
  //   .then(response => {
  //     log('GOT RESPONSE', response.data)
  //   })
  //   .catch(err => {
  //     log('GOT ERROR', err)
  //   })
}

// test()

module.exports = UserModel
