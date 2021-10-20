const express = require('express')
const router = express.Router()
const products = require('./modules/products')
const users = require('./modules/users')

router.use('/api/products', products)

router.use('/api/users', users)

module.exports = router