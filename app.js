const express = require('express')
const cors = require('cors')
const apiErrorHandler = require('./middlewares/errorHandler')
const session = require('express-session')
const passport = require('passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override')

app.use(
  session({
    secret: 'gofarmmy',
    name: 'gofarmmy',
    cookie: { maxAge: 8000000 },
    resave: false,
    saveUninitialized: true,
  })
)

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(passport.initialize())

app.use(routes)

app.use(apiErrorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))