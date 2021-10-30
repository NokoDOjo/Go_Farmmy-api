const adminService = require('../services/adminService')
const userService = require('../services/userService')

const adminProduct = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const { status, message, token, user } = await adminService.signIn(email, password)
      return res.json({
        status,
        message,
        token,
        user,
      })    
    } catch (error) {
      next(error)
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const products  = await adminService.getProducts()

      return res.json({ products })
    } catch (error) {
      next(error)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await adminService.getProduct(productId)

      return res.json({ product })
    } catch (error) {
      next(error)
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const { files } = req

      const { status, message, product } = await adminService.postProduct(files, req.body)
      
      return res.json({ status, message, product })
    } catch (error) {
      next(error)
    }
  },
  putProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const { files } = req

      const { status, message, product } = await adminService.putProduct(productId, files, req.body)

      return res.json({ status, message, product })
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.id

      const { status, message } = await adminService.deleteProduct(productId)

      return res.json({ status, message })
    } catch (error) {
      next(error)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await adminService.getUsers()

      return res.json({ users })
    } catch (error) {
      next(error)
    }
  },
  putUser: async (req, res, next) => {
    try {
      const userId = req.params.id

      const { status, message, user } = await adminService.putUser(userId, req.body)

      return res.json({ status, message, user })
    } catch (error) {
      next(error)
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const orders = await adminService.getOrders()

      return res.json({ orders })
    } catch (error) {
      next(error)
    }
  },
  putOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id
      const { status, message, order } = await adminService.putOrder(orderId, req.body)

      return res.json({ status, message, order })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminProduct