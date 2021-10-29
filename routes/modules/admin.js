const express = require('express')
const router = express.Router()
const { authenticated, checkAdmin } = require('../../middlewares/auth')
const adminController = require('../../controllers/adminController')
const multer = require('multer')
const { Router } = require('express')
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

router.post('/signin', adminController.signIn)

router.get('/products', authenticated, checkAdmin, adminController.getProducts)

router.get('/products/:id', authenticated, checkAdmin, adminController.getProduct)

router.post('/product', authenticated, checkAdmin, cpUpload, adminController.postProduct)

module.exports = router