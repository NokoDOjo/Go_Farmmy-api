const express = require('express')
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))