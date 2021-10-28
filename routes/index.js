const express = require('express')
const router = express.Router()
const products = require('./modules/products')
const users = require('./modules/users')
const cart = require('./modules/cart')
const orders = require('./modules/orders')
const auth = require('./modules/auth')
const { authenticated, checkUser, checkAdmin } = require('../middlewares/auth')
const paymentController = require('../controllers/paymentController')

router.use('/api/products', products)

router.use('/api/users', users)

router.use('/api/cart', authenticated, cart)

router.use('/api/orders', authenticated, orders)

router.use('/api/auth', auth)

router.post('/spgateway/callback', paymentController.spgatewayCallback)

module.exports = router