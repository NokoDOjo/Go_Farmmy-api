const productService = require('../services/productService')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      if (req.query.categoryId) {
        const CategoryId = req.query.categoryId
        const products = await productService.getProductsByCategory(CategoryId)
        return res.status(200).json(products)
      }
      const products = await productService.getProducts()
      return res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await productService.getProduct(productId)
      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController