const { Cart, CartItem, Product, Sequelize } = require('../models')
const apiError = require('../libs/apiError')

const cartService = {
  getCart: async (userId) => {
    const cart = await Cart.findOne({
      where: { UserId: userId },
      include: [{ model: Product, as: 'items' }],
      attributes: [
        'id',
        // [Sequelize.literal('SUM(`Products`.price * `Products->CartItems`.quantity)'), 'totalAmount']
      ],
    })

    return cart
  },
  postCart: async (userId, productId, quantity) => {
    const product = await Product.findByPk(productId)

    if (product.quantity === 0) {
      throw apiError.badRequest(400, 'This merchandise is out of stock')
    }

    const [cart] = await Cart.findOrCreate({
      where: {
        UserId: userId || 0,
      },
    })

    const [newCartItem, isItemNew] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: productId,
      },
    })

    isItemNew ? (newCartItem.quantity = Number(quantity) || 1) : (newCartItem.quantity += Number(quantity) || 1)

    await newCartItem.save()

    return {
      cart,
      newCartItem,
      product,
    }
  },
  addCartItem: async (productId, userId) => {
    const product = await Product.findByPk(productId)
    if (product.quantity === 0) {
      throw apiError.badRequest(400, 'This merchandise is out of stock')
    }
    const userCart = await Cart.findOne({
      where: { UserId: userId },
    })

    const cartId = userCart.dataValues.id
    const cartItem = await CartItem.findOne({
      where: { CartId: cartId, ProductId: productId },
    })
    await cartItem.increment('quantity')

    return { cartItem, product }
  },
  subCartItem: async (productId, userId) => {
    const product = await Product.findByPk(productId)

    const userCart = await Cart.findOne({
      where: { UserId: userId },
    })

    const cartId = userCart.dataValues.id
    const cartItem = await CartItem.findOne({
      where: { CartId: cartId, ProductId: productId },
    })
    await cartItem.decrement('quantity')

    return { cartItem, product }
  },
  deleteCartItem: async (productId, userId) => {

    const userCart = await Cart.findOne({
      where: { UserId: userId },
    })

    const cartId = userCart.dataValues.id

    const cartItem = await CartItem.findOne({
      where: { CartId: cartId, ProductId: productId },
    })

    await cartItem.destroy()

    return { status: 'success', message: 'Successfully deleted cart item'}
  },
  deleteAllCartItem: async (userId) => {
    const userCart = await Cart.findOne({
      where: { UserId: userId },
    })

    const cartId = userCart.dataValues.id

    await CartItem.destroy({
      where: { CartId: cartId }
    })

    return { status: 'success', message: 'Successfully deleted all cart item'}
  }
}

module.exports = cartService