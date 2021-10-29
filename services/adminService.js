const { Product, User, Order, OrderItem, Category } = require('../models')
const bcrypt = require('bcryptjs')
const apiError = require('../libs/apiError')
const jwt = require('jsonwebtoken')

const adminService = {
  signIn: async (email, password) => {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw apiError.badRequest(404, 'User does not exist')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw apiError.badRequest(403, 'Wrong password')
    }
    if (!user.isAdmin) {
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
        email: user.email,
      },
    }
  },
  getProducts: async () => {
    const products = Product.findAll({ include: [{ model: Category }]})

    return products
  },
  getProduct: async (productId) => {
    const product = await Product.findByPk(productId, { include: [Category] })

    return product 
  }
}

module.exports = adminService