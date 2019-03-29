var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET users listing. */
router.route('/')
	.get(categoryController.getAllCategories)
	.post(categoryController.addCategory);


router.route('/:category_id')
		.get(categoryController.getCategory)
		.put(categoryController.updateCategory)
		.delete(categoryController.deleteCategory);

router.param('category_id', categoryController.getCategoryById);

module.exports = router;

