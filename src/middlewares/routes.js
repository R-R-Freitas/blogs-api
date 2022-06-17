const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();
const user = require('../controllers/userController');
const category = require('../controllers/categoryController');
const blogPost = require('../controllers/blogPostController');

router.post('/login', rescue(user.login));
router.post('/user', rescue(user.create));
router.get('/user', rescue(user.getAll));
router.get('/user/:id', rescue(user.getById));

router.post('/categories', rescue(category.create));
router.get('/categories', rescue(category.getAll));

router.post('/post', rescue(blogPost.create));
router.get('/post', rescue(blogPost.getAll));
router.get('/post/:id', rescue(blogPost.getById));

module.exports = router;
