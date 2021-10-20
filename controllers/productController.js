const productService = require('../services/productService')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await productService.getProducts()
      console.log(products)
      return res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController