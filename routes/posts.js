var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/postsController');

router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createdPosts);

router.delete('/', PostsControllers.deleteAll);

router.delete('/:id', PostsControllers.deleteSingle);

router.patch('/:id', PostsControllers.patchPosts);

module.exports = router;