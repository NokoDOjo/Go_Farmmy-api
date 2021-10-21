const cartService = require('../services/cartService')

const cartController = {
  postCart: async (req, res) => {
    try {
      if (!req.body.productId) {
        return res.json({
          status: 'error',
          message: '缺少productId'
        })
      }

      const cartId = req.session.cartId
      const cart = await cartService.getCart(cartId)
    } catch (error) {
      
    }
  }
} 
