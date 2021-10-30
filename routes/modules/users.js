const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authenticated, checkUser, checkAdmin } = require('../../middlewares/auth')

router.post('/', userController.signUp)

router.post('/signin', userController.signIn)

router.get('/currentUser', authenticated, userController.getCurrentUser)

router.put('/', authenticated ,userController.putUser)

module.exports = router

