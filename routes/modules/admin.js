const express = require('express')
const router = express.Router()
const { authenticated, checkAdmin } = require('../../middlewares/auth')
const adminController = require('../../controllers/adminController')

router.post('/signin', adminController.signIn)

router.get('/products', authenticated, checkAdmin, adminController.getProducts)

router.get('/products/:id', authenticated, checkAdmin, adminController.getProduct)

module.exports = router