const { BlogPost, PostCategory, User, Category } = require('../database/models');
const errorHandler = require('../utils/errorHandler');

const notFound = 'Post does not exist';

const create = async (title, content, userId, categoryIds) => {
  const published = new Date();
  const updated = new Date();
  const newBlogPost = await BlogPost.create({ title, content, published, updated, userId });
  const postId = newBlogPost.id;
  const newPostCategory = categoryIds.map((categoryId) => ({ categoryId, postId }));
  await PostCategory.bulkCreate(newPostCategory);
  return newBlogPost;
};

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(
    id,
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
  );
  if (!blogPost) throw errorHandler(404, notFound);
  return blogPost;
};

const edit = async (id, title, content) => {
  const updated = new Date();
  const [blogPost] = await BlogPost.update(
    { title, content, updated },
    { where: { id } },
  );
  if (blogPost) return getById(id);
};

const remove = async (id) => {
  const removedPost = await BlogPost.destroy({ where: { id } });
  if (!removedPost) throw errorHandler(404, notFound);
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  remove,
};
