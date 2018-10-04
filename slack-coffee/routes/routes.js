const express = require('express')

const router = express.Router()

router.post('/slack/command/coffee', async (req, res) => {
  try{
    console.log(req.body)
    return res.status(200).send("Success")
  }catch(e){
    console.log("Err", e)
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
})

router.post('/slack/actions', async (req, res) => {
  try {
    const slackReqObj = JSON.parse(req.body.payload);
    console.log(slackReqObj)
    return res.status(200).send("Success")
  } catch (err) {
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
});

module.exports = router