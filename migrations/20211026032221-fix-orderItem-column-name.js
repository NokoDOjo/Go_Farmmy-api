'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('OrderItems', 'productId', 'ProductId')
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
