const { Product, Order, OrderItem } = require('../models')
const apiError = require('../libs/apiError')
const faker = require('faker')
const snNum = faker.random.number()

const orderService = {
  postOrder: async (
    userId,
    customerName,
    customerEmail,
    customerPhone,
    recipientName,
    recipientEmail,
    recipientPhone,
    recipientAddress,
    amount,
    cart
  ) => {
    const orderData = await Order.create({
      sn: snNum,
      customerName,
      customerEmail,
      customerPhone,
      recipientName,
      recipientEmail,
      recipientPhone,
      recipientAddress,
      UserId: userId,
      amount
    })

    const orderId = orderData.id

    await Promise.all(cart.items.map(async d => {
      await OrderItem.create({
        price: d.dataValues.totalPrice,
        quantity: d.CartItem.quantity,
        ProductId: d.id,
        OrderId: orderId
      })
      let product = await Product.findByPk(d.id)
      await product.decrement('quantity', { by: d.CartItem.quantity })
    }))

    const orderItemData = await Order.findOne({
      where: { id: orderId },
      include: [{ model: Product, as: 'items' }],
      attributes: ['id']
    })

    return { orderId, orderData, orderItemData }
  },
  getOrder: async (orderId) => {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [{ model: Product, as: 'items' }]
    })

    return order
  },
  deleteOrder: async (orderId, userId) => {
    const order = await Order.findByPk(orderId)
    if (!order) {
      throw apiError.badRequest(404, 'No following order exist')
    }
    if (order.UserId !== userId) {
      throw apiError.badRequest(403, 'Cannot delete others order')
    }

    await order.destroy()
    const orderItems = await OrderItem.findAll({
      where: { OrderId: orderId }
    })
    await Promise.all(await orderItems.map( async d => {
      let product = await Product.findByPk(d.ProductId)
      await product.increment('quantity', { by: d.quantity })
    }))
    await OrderItem.destroy({
      where: { OrderId: orderId }
    })

    return { status: 'success', message: 'Successfully deleted order'}
  }
}

module.exports = orderService