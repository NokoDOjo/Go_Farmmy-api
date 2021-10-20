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
  }
}

module.exports = userService
