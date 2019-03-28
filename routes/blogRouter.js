var express = require('express');
var router = express.Router();

const blogController = require('../controllers/blogController');

/* GET users listing. */
router.route('/')
	.get(blogController.getAllBlogs)
	.post(blogController.addBlog);


router.route('/:blog_id')
		.get(blogController.getBlog)
		.put(blogController.updateBlog)
		.delete(blogController.deleteBlog);

router.param('blog_id', blogController.getBlogById);

module.exports = router;

