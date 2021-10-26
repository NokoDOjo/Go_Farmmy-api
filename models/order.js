'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Product, {
        as: 'items',
        through: {
          model: models.OrderItem,
          unique: false
        },
        foreignKey: 'OrderId'
      })
      Order.belongsTo(models.User)
    }
  };
  Order.init({
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    recipientName: DataTypes.STRING,
    recipientEmail: DataTypes.STRING,
    recipientPhone: DataTypes.STRING,
    recipientAddress: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    shipping_status: { type:DataTypes.STRING, defaultValue: '0' },
    payment_status:{ type:DataTypes.STRING, defaultValue: '0' },
    UserId: DataTypes.INTEGER,
    sn: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};