const express = require('express')
const router = express.Router()
const products = require('./modules/products')
const users = require('./modules/users')
const cart = require('./modules/cart')
const orders = require('./modules/orders')
const { authenticated, checkUser, checkAdmin } = require('../middlewares/auth')

router.use('/api/products', products)

router.use('/api/users', users)

router.use('/api/cart', authenticated, cart)

router.use('/api/orders', authenticated, orders)

module.exports = router