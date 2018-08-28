const Harvest = require('./app/harvest-api')
const SlackAPI = require('./')

async function startup(){
  const harvestUsers = await Harvest.getUsers() || []
  
  // await asyncMap(
  //   harvestUsers,
  //   async user => {
      
  //   }
  // );
}

function asyncMap(items, fn){
  return Promise.all(items.map(fn))
}

module.exports = startup