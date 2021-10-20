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
  }
}

module.exports = productService