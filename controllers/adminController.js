const adminService = require('../services/adminService')

const adminProduct = {
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