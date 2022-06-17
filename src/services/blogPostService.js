const { BlogPost, PostCategory } = require('../database/models');
const errorHandler = require('../middlewares/errorHandler');

const notFound = 'Post does not exist';

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
  if (!blogPost) throw errorHandler(404, notFound);
  return blogPost;
};

const edit = async (id, title, content) => {
  const [blogPost] = await BlogPost.update(
    { title, content },
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
