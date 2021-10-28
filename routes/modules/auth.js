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
  passport.authenticate('facebook'), (req, res) => {
    const user = req.user
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.cookie('auth', token)
    res.redirect('http://localhost:8080/#/goFarmmy/signin')
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
  passport.authenticate('google'),
  (req, res) => {
    const user = req.user
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.cookie('auth', token)
    res.redirect('http://localhost:8080/#/goFarmmy/signin')
  }
)


module.exports = router
