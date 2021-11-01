const orderService = require('../services/orderService')
const cartService = require('../services/cartService')
const emailNotice = require('../libs/emailNotice')

const orderController = {
  postOrder: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { customerName, customerEmail, customerPhone, recipientName, recipientEmail, recipientPhone, recipientAddress } = req.body
      const { cart, totalPrice, totalQuantity, shippingInfo } = await cartService.getCart(userId)
      const checkoutPrice = totalPrice + shippingInfo.fee

      const { orderId, orderData, orderItemData } = await orderService.postOrder(
        userId,
        customerName,
        customerEmail,
        customerPhone,
        recipientName,
        recipientEmail,
        recipientPhone,
        recipientAddress,
        checkoutPrice,
        cart
      )

      res.json({
        status: 'success',
        message: 'Successfully added an order',
        orderId,
        orderData,
        orderItemData,
        shippingInfo
      })

      const emailSubject = '[農作伙系統信]：您的訂單已成立！'
      const emailContent = `<h4>${customerName} 你好</h4> <p>您的訂單已成立，若有任何問題，歡迎隨時與我們聯繫，感謝！</p>`
      
      emailNotice.sendEmail(customerEmail, emailSubject, emailContent)

    } catch (error) {
      next(error)
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id
      const order = await orderService.getOrder(orderId)

      return res.json({order})
    } catch (error) {
      next(error)
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id
      const userId = req.user.id
      const { status, message } = await orderService.deleteOrder(orderId, userId)

      return res.json({ status, message })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = orderController

