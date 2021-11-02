const express = require('express')
const router = express.Router()
const { authenticated, checkAdmin } = require('../../middlewares/auth')
const adminController = require('../../controllers/adminController')
const multer = require('multer')
const validate = require('../../middlewares/validate')
const { signIn } = require('../../libs/shema')
const upload = multer({
  dest: 'temp/',
  fileFilter(req, files, cb) {
    if (!files.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(apiError.badRequest(415, 'Image file should be jpg, jpeg or png'))
    }
    cb(null, true)
  }
})
const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 }
])

router.post('/signin', validate(signIn), adminController.signIn)

router.get('/products', authenticated, checkAdmin, adminController.getProducts)

router.get('/products/:id', authenticated, checkAdmin, adminController.getProduct)

router.post('/product', authenticated, checkAdmin, cpUpload, adminController.postProduct)

router.put('/product/:id', authenticated, checkAdmin, cpUpload, adminController.putProduct)

router.delete('/product/:id', authenticated, checkAdmin, adminController.deleteProduct)

router.get('/users', authenticated, checkAdmin, adminController.getUsers)

router.put('/users/:id', authenticated, checkAdmin, adminController.putUser)

router.get('/orders', authenticated, checkAdmin, adminController.getOrders)

router.put('/orders/:id', authenticated, checkAdmin, adminController.putOrder)

module.exports = router