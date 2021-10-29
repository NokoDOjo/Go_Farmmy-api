'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'shippings',
      Array.from({ length: 10 }).map((d, i) => ({
        id: i * 10 + 1,
        name: '大榮冷藏運輸',
        quantity: i + 1,
        fee: (i + 1) % 2 !== 0 ? Math.floor((i + 1)/2)*180 + 150 : ((i + 1)/2) * 180,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shippings', null, {})
  }
};
