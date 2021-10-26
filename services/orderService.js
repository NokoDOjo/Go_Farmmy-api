const { Product, Order, OrderItem } = require('../models')
const apiError = require('../libs/apiError')
const faker = require('faker')
const orderitem = require('../models/orderitem')
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
  }
}

module.exports = orderService