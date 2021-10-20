const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('Hello this is product page')
})


module.exports = router