const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authenticated, checkUser, checkAdmin } = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const { signUp, signIn, user, fbGoogle } = require('../../libs/shema')

router.post('/', validate(signUp), userController.signUp)

router.post('/signin', validate(signIn), userController.signIn)

router.post('/fbSignIn', validate(fbGoogle), userController.fbSignIn)

router.post('/googleSignIn', userController.googleSignIn)

router.get('/currentUser', authenticated, checkUser, userController.getCurrentUser)

router.put('/', validate(user), authenticated, checkUser, userController.putUser)

module.exports = router

