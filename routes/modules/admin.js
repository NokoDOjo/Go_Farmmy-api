const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/adminController')

router.get('/products', adminController.getProducts)

router.get('/products/:id', adminController.getProduct)

module.exports = router