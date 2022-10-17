const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (post, id) => {
  const result = await BlogPost.create({
    ...post,
    userId: id,
    updated: new Date(),
    published: new Date(),
  });
  await Promise.all(
    post.categoryIds.map(async (categoryId) =>
      PostCategory.create({
        postId: result.id,
        categoryId,
      })),
  );
  return { type: null, message: result };
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const getById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const updatePostById = async (data, id) => {
  const post = await getById(id);
  post.update(data);
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePostById,
};