const { Product, Order, OrderItem, Category } = require('../models')

const adminService = {
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