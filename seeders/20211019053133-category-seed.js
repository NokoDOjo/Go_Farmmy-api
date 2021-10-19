'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 1,
          name: '果物',
          EnName: 'Fruit',
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
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
