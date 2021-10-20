const userService = require('../services/userService')

const userController = {
  signUp: async (req, res, next) => {
    const { name, email, password, checkPassword } = req.body
    try {
      const { status, message } = await userService.signUp(name, email, password)
      return res.json({ status, message })
    } catch (error) {
      next(error)
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const { status, message, token, user } = await userService.signIn(email, password)
      return res.json({
        status,
        message,
        token,
        user,
      })    
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController