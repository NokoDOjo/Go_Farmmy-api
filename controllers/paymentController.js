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
      if (req.query.from === 'NotifyURL') { return res.json ({ status: 'success', message: 'Get the NotifyURL'}) }
      if (req.query.from === 'ReturnURL') {
        const redirectURL = await paymentService.spgatewayCallback(req.body)
        return res.redirect(redirectURL)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = paymentController