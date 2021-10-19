'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'storage_method', {
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('Products', 'origin', {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'storage_method')
    await queryInterface.removeColumn('Products', 'origin')
  }
};
