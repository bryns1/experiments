import axios from 'axios'
import CONFIG from '../../config'

export function getActiveHarvestEntries (userID) {
  return axios.get('')
}

export function linkSlack (user) {
  return axios.post('/api/auth/slack', {...user})
    .catch(err => {
      console.log('axios error at linkSlack:', err.toString())
    })
    .then(response => response.data)
}

export function getHarvest (userID) {
  console.log('Requesting harvest auth')
  return axios.post(`/api/auth/harvest`, {id: userID})
    .catch(err => {
      console.log('axios error at getHarvest:', err.toString())
    })
    .then(response => response.data)
}

export function linkHarvest (user) {
  window.open(`https://id.getharvest.com/oauth2/authorize?client_id=${CONFIG.HARVEST.clientId}&response_type=code&state={"user":${user}}&redirect_uri=${CONFIG.NGROK}/api/auth/harvest`, '_blank')
}
