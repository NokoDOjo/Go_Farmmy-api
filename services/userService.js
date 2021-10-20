const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const userService = {
  signUp: async (name, email, password) => {
    const duplicate_email = await User.findOne({ where: { email }})
    if (duplicate_email) {
      return { status: 'error', message: 'Email has been registered' }
    }
    const newUser = await User.create({
      name, 
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      isAdmin: false
    })
    return { status: 'success', message: 'Successfully sign up'}
  },
  signIn: async (email, password) => {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return { status: error, message: 'User does not exist' }
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return { status: error, message: 'Password incorrect' }
    }
    if (user.isAdmin) {
      return { status: error, message: 'Access denied' }
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return {
      status: 'success',
      message: 'Successfully login',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}

module.exports = userService
