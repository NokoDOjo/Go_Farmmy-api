const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cartController')

router.get('/', cartController.getCart)

router.post('/', cartController.postCart)

router.post('/cartItem/:id/add', cartController.addCartItem)

router.post('/cartItem/:id/sub', cartController.subCartItem)

module.exports = router