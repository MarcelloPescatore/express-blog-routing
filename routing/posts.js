// file che gestisce le rotte
const express = require('express');
const PostsController = require('../controllers/PostsController.js');
const router = express.Router();

// rotta di index
router.get('/', PostsController.index);
// rotta per tag
router.get('/filter', PostsController.filter);
// Crea un nuovo post
router.post('/store', PostsController.store); 
// rotta di show
router.get('/:slug', PostsController.show);

module.exports = router;