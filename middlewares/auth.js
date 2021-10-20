const jwt = require('jsonwebtoken')
const passport = require('../config/passport')
const { User } = require('../models')

const authenticated = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return new Error(err)
    }
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Access denied' })
    }
    req.user = user.dataValues

    return next()
  })(req, res, next)

const checkUser = () => {
  return (req, res, next) => {
    if (req.user.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      })
    }
    return next()
  }
}

const checkAdmin = () => {
  return (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied',
      })
    }
    return next()
  }
}

module.exports = { authenticated, checkUser, checkAdmin }