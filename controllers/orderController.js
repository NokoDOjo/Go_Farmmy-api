const orderService = require('../services/orderService')
const cartService = require('../services/cartService')

const orderController = {
  postOrder: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { customerName, customerEmail, customerPhone, recipientName, recipientEmail, recipientPhone, recipientAddress } = req.body
      const { cart, totalPrice, totalQuantity, shippingInfo } = await cartService.getCart(userId)

      const { orderId, orderData, orderItemData } = await orderService.postOrder(
        userId,
        customerName,
        customerEmail,
        customerPhone,
        recipientName,
        recipientEmail,
        recipientPhone,
        recipientAddress,
        totalPrice,
        cart
      )

      return res.json({
        status: 'success',
        message: 'Successfully added an order',
        orderId,
        orderData,
        orderItemData,
        shippingInfo
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = orderController

