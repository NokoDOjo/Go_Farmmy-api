const { Cart, CartItem, Product } = require('../models')
const apiError = require('../libs/apiError')

const cartService = {
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