const express = require('express');
const rescue = require('express-rescue');
const user = require('../controllers/userController');
const category = require('../controllers/categoryController');
const blogPost = require('../controllers/blogPostController');
const authToken = require('./authToken');

const router = express.Router();

router.post('/login', rescue(user.login));
router.post('/user', rescue(user.create));
router.get('/user', [rescue(authToken)], rescue(user.getAll));
router.get('/user/:id', [rescue(authToken)], rescue(user.getById));
router.delete('/user/me', [rescue(authToken)], rescue(user.remove));

router.post('/categories', [rescue(authToken)], rescue(category.create));
router.get('/categories', [rescue(authToken)], rescue(category.getAll));

router.post('/post', [rescue(authToken)], rescue(blogPost.create));
router.get('/post', [rescue(authToken)], rescue(blogPost.getAll));
router.get('/post/:id', [rescue(authToken)], rescue(blogPost.getById));
router.put('/post/:id', [rescue(authToken)], rescue(blogPost.edit));
router.delete('/post/:id', [rescue(authToken)], rescue(blogPost.remove));

module.exports = router;
