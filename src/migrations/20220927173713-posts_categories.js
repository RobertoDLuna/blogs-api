'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const TablePostCategories = await queryInterface.createTable('posts_categories',{
      post_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'blog_posts',
        //   key: 'id',
        // },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'categories',
        //   key: 'id',
        // },
        onDelete: 'CASCADE',
      }
    });
    return TablePostCategories;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  },
};
