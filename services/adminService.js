const { Product, User, Order, OrderItem, Category } = require('../models')
const bcrypt = require('bcryptjs')
const apiError = require('../libs/apiError')
const jwt = require('jsonwebtoken')
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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
  },
  postProduct: async (files, body) => {
    if (files) {
      imgur.setClientId(IMGUR_CLIENT_ID)
      const image = files.image ? await imgur.uploadFile(files.image[0].path) : null

      const product = await Product.create({
        ...body,
        image: image.link
      })

      return {
        status: 'success',
        message: 'Successfully added product',
        product
      }
    }
  },
  putProduct: async (productId, files, body) => {
    if (files) {
      imgur.setClientId(IMGUR_CLIENT_ID)
      const image = files.image ? await imgur.uploadFile(files.image[0].path) : null

      const product = await Product.findByPk(productId)

      await product.update({
        ...body,
        image: files.image ? image.link : product.image
      })

      return {
        status: 'success',
        message: 'Successfully edited product',
        product
      }
    }
  },
  deleteProduct: async (productId) => {
    const product = await Product.findByPk(productId)
    await product.destroy()

    return { 
      status: 'success',
      message: 'Successfully deleted product'
    }
  },
  getUsers: async () => {
    const users = await User.findAll({
      where: { isAdmin: 0 },
      order: [['createdAt', 'DESC']]
    })
    return users
  },
  putUser: async (userId, body) => {
    const user = await User.findByPk(userId)
    await user.update({...body})

    return {
      status: 'success',
      message: 'Successfully edited user data',
      user
    }
  }
}

module.exports = adminService