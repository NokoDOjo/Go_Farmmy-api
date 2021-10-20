const { Product, Category } = require('../models')
const apiError = require('../libs/apiError')

const productService = {
  getProducts: async () => {
    const products = await Product.findAll({
      include: [
        {
          model: Category
        }
      ]
    })

    return products
  },
  getProduct: async (id) => {
    const product = await Product.findByPk(id)
    if (!product) {
      throw apiError.badRequest(404, 'Product not found')
    }
    return product
  }
}

module.exports = productService