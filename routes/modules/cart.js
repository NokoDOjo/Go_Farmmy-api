const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cartController')

router.get('/', cartController.getCart)

router.post('/', cartController.postCart)

router.post('/cartItem/:id/add', cartController.addCartItem)

router.post('/cartItem/:id/sub', cartController.subCartItem)

router.delete('/cartItem/:id', cartController.deleteCartItem)

router.delete('/cartItem', cartController.deleteAllCartItem)

module.exports = router