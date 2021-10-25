'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ShippingMethods',
      [
        {
          id: 1,
          name: '大榮冷藏運輸',
          fee: 120,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          name: '蔬菜',
          EnName: 'Vegetable',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
