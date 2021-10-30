const express = require("express")
const router = express.Router()
const orderController = require('../../controllers/orderController')
const paymentController = require('../../controllers/paymentController')

router.post('/', orderController.postOrder)

router.get('/:id', orderController.getOrder)

router.get('/:id/payment', paymentController.getPayment)

router.delete('/:id', orderController.deleteOrder)

module.exports = router