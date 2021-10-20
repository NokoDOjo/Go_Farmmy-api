const { Product, Category } = require('../models')

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

    return product
  }
}

module.exports = productService