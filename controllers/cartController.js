const cartService = require('../services/cartService')

const cartController = {
  postCart: async (req, res, next) => {
    try {
      const { productId, quantity } = req.body
      if (!req.body.productId) {
        return res.json({
          status: 'error',
          message: 'Need productId'
        })
      }

      const cartId = req.session.cartId
      const { cart, cartItem, product } = await cartService.postCart(cartId, productId, quantity)
      req.session.cartId = cart.id
      await req.session.save()

      return res.json({
        status: 'success',
        cart,
        cartItem,
        product
      })
    } catch (error) {
      next(error)
    }
  }
} 

module.exports = cartController
