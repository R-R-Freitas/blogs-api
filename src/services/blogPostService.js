const { BlogPost, PostCategory } = require('../database/models');

const create = async (title, content, userId, categoryIds) => {
  const newBlogPost = await BlogPost.create({ title, content, userId });
  const postId = newBlogPost.id;
  const newPostCategory = categoryIds.map((categoryId) => ({ categoryId, postId }));
  console.log(newPostCategory);
  await PostCategory.bulkCreate(newPostCategory);
  return newBlogPost;
};

const getAll = async () => {
  const blogPosts = await BlogPost.findAll();
  return blogPosts;
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id);
  return blogPost;
};

module.exports = {
  create,
  getAll,
  getById,
};
