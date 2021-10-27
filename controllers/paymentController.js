const paymentService = require('../services/paymentService')

const paymentController = {
  getPayment: async (req, res, next) => {
    try {
      const orderId = req.params.id
      const { order, tradeInfo } = await paymentService.getPayment(orderId)

      return res.json({ order, tradeInfo })
    } catch (error) {
      next(error)
    }
  },
  spgatewayCallback: async (req, res, next) => {
    try {
      const tradeInfo = req.body.tradeInfo
      await paymentService.spgatewayCallback(tradeInfo)

      return res.redirect('http://localhost:8080/#/goFarmmy/checkout/complete')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = paymentController