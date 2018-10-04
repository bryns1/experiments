const axios = require('axios')
const CONFIG = require('../config')

const HARVEST_POST = {
  headers: {
    'User-Agent': 'Slack Integration (bryn@ed.com.au)',
    'Content-Type': 'application/json'
  }
}

const HARVEST_QUERY = `client_id=${CONFIG.HARVEST.clientId}&client_secret=${CONFIG.HARVEST.clientSecret}`

function getTokens (code) {
  return axios.post('https://id.getharvest.com/api/v2/oauth2/token', {
    code: code,
    client_id: CONFIG.HARVEST.clientId,
    client_secret: CONFIG.HARVEST.clientSecret,
    grant_type: 'authorization_code'
  }, HARVEST_POST).then(response => response.data)
}

function refreshToken (token) {
  return axios.post('https://id.getharvest.com/api/v2/oauth2/token', {
    refresh_token: token.refresh_token,
    client_id: CONFIG.HARVEST.clientId,
    client_secret: CONFIG.HARVEST.clientSecret,
    grant_type: 'refresh_token'
  }, HARVEST_POST).then(response => response.data)
}

function getActiveHarvestEntries (tokens) {
  return axios.get(`https://api.harvestapp.com/v2/time_entries?${HARVEST_QUERY}`, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'User-Agent': `Slack Integration (bryn@ed.com.au)`
    }
  })
}

Object.assign(module.exports, {
  getTokens,
  refreshToken,
  getActiveHarvestEntries
})
