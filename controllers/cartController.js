const cartService = require('../services/cartService')

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const userId = req.user.id
      const cart = await cartService.getCart(userId)

      return res.json({ cart })
    } catch (error) {
      next(error)
    }
  },
  postCart: async (req, res, next) => {
    try {
      const { productId, quantity } = req.body
      const userId = req.user.id
      if (!req.body.productId) {
        return res.json({
          status: 'error',
          message: 'Need productId',
        })
      }

      const { cart, cartItem, product } = await cartService.postCart(userId, productId, quantity)

      return res.json({
        status: 'success',
        cart,
        cartItem,
        product,
      })
    } catch (error) {
      next(error)
    }
  },
  addCartItem: async (req, res, next) => {
    try {
      const productId = req.params.id
      const userId = req.user.id
      const { cartItem, product } = await cartService.addCartItem(productId, userId)

      return res.json({
        cartItem,
        product,
      })
    } catch (error) {
      next(error)
    }
  },
  subCartItem: async (req, res, next) => {
    try {
      const productId = req.params.id
      const userId = req.user.id
      const { cartItem, product } = await cartService.subCartItem(productId, userId)

      return res.json({
        cartItem,
        product,
      })
    } catch (error) {
      next(error)
    }
  },
} 

module.exports = cartController
