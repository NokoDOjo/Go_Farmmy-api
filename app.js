const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const methodOverride = require('method-override')

app.use(cors())

app.get('/', (req, res) => {
  console.log('Hello world')
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))