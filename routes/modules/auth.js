const express = require('express')
const router = express.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'https://localhost:8080/#/goFarmmy/signin',
    successRedirect: 'https://localhost:8080/#/goFarmmy/signin',
  }),
  (req, res) => {
    const user = req.user
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({
      status: 'success',
      message: 'Successfully login',
      user,
      token,
    })
  }
)

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://localhost:8080/#/goFarmmy/signin',
    successRedirect: 'https://localhost:8080/#/goFarmmy/signin',
  }),
  (req, res) => {
    const user = req.user
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({
      status: 'success',
      message: 'Successfully login',
      user,
      token,
    })
  }
)
module.exports = router
