const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authenticated, checkUser, checkAdmin } = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const { signUp, signIn, user } = require('../../libs/shema')

router.post('/', validate(signUp), userController.signUp)

router.post('/signin', validate(signIn), userController.signIn)

router.post('/fbGoogleSignIn', userController.fbGoogleLogin)

router.get('/currentUser', authenticated, userController.getCurrentUser)

router.put('/', validate(user), authenticated ,userController.putUser)

module.exports = router

