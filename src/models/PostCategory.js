const PostCategoryModel = (sequelize, DataTypes) => {
	const PostCategory = sequelize.define(
	  'PostCategory',
	  {
		postId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		field: 'post_id'
	  },
	  {
		timestamps: false,
		underscored: true,
		tableName: 'posts_categories',
	  });
	  PostCategory.associate = (models) => {
		models.Category.belongsToMany(models.BlogPost, {
		  through: PostCategory,
		  foreignKey: 'categoryId',
		  otherKey: 'postId',
		  as: 'blog_posts'
		});
		models.BlogPost.belongsToMany(models.Category, {
		  through: PostCategory,
		  foreignKey: 'postId',
		  otherKey: 'categoryId',
		  as: 'categories'
		})
	  }
	  return PostCategory;
  };
  
  module.exports = PostCategoryModel;