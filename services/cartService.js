const { Cart, CartItem, Product, Sequelize } = require('../models')
const apiError = require('../libs/apiError')

const cartService = {
  getCart: async (cartId) => {
    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [{ model: Product, as: 'items', attributes: [ 'id', 'name', 'price', 'image' ] }],
      attributes: [
        'id', 
        // [Sequelize.literal('SUM(`Products`.price * `Products->CartItems`.quantity)'), 'totalAmount']
      ]
    })

    return cart
  },
  postCart: async (cartId, productId, quantity) => {

    const product = await Product.findByPk(productId)

    if (product.quantity === 0) {
      throw apiError.badRequest(400, 'This merchandise is out of stock')
    }

    const [cart] = await Cart.findOrCreate({
      where: {
        id: cartId || 0,
      }
    })

    const [newCartItem, isItemNew] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: productId
      }
    })

    product.quantity -= quantity
    await product.save()

    isItemNew ? (newCartItem.quantity = Number(quantity) || 1) : (newCartItem.quantity += (Number(quantity) || 1))

    await newCartItem.save()

    return {
      cart,
      newCartItem,
      product
    }
  }
}

module.exports = cartService