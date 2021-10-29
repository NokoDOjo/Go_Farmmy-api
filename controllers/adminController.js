const adminService = require('../services/adminService')

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
  }
}

module.exports = adminProduct