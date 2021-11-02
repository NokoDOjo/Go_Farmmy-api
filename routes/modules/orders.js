const express = require("express")
const router = express.Router()
const orderController = require('../../controllers/orderController')
const paymentController = require('../../controllers/paymentController')
const validate = require('../../middlewares/validate')
const { order } = require('../../libs/shema')

router.post('/', validate(order), orderController.postOrder)

router.get('/:id', orderController.getOrder)

router.get('/:id/payment', paymentController.getPayment)

router.delete('/:id', orderController.deleteOrder)

module.exports = router