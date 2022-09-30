const ModelBlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
      'BlogPost',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: 'TIMESTAMP',
        updated: 'TIMESTAMP',
  
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'blog_posts',
      });
      BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
          foreignKey: 'id',
          as: 'user'
        });
      };
      return BlogPost;
  };
  
  module.exports = ModelBlogPost;