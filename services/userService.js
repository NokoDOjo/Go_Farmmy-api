const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Order, Product } = require('../models')
const apiError = require('../libs/apiError')
const { Op } = require('sequelize')

const userService = {
  signUp: async (name, email, password) => {
    const duplicate_email = await User.findOne({ where: { email }})
    if (duplicate_email) {
      throw apiError.badRequest(400, 'This email has been registered')
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
      throw apiError.badRequest(404, 'User does not exist')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw apiError.badRequest(403, 'Wrong password')
    }
    if (user.isAdmin) {
      throw apiError.badRequest(403, 'Access denied')
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
  },
  getCurrentUser: async (userId) => {
    const currentUser = await User.findByPk(userId)
    const userOrders = await Order.findAll({
      where: { 
        UserId: userId,
        payment_status: { [Op.not]: 2 } 
      },
      include: [{ model: Product, as: 'items' }],
      order: [['createdAt', 'DESC']]
    })

    return { currentUser, userOrders }
  },
  putUser: async (userId, body) => {
    const currentUser = await User.findByPk(userId)
    const password = body.password
    const newPassword = body.newPassword
    if (!password) {
      await currentUser.update({...body})
      return { status: 'success', message: 'Successfully edited user data' }
    }
    if (!bcrypt.compareSync(password, currentUser.password)) {
      throw apiError.badRequest(403, 'Wrong password')
    }
    await currentUser.update({
      ...body,
      password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
    })

    return {
      status: 'success',
      message: 'Successfully edited user data including password'
    }
  }
}

module.exports = userService
