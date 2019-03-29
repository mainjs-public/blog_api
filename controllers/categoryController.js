const Category = require('../models/categoryModel');

module.exports = {
	getAllCategories: (req, res, next) => {
		Category.find({}, (err, docs) => {
			if (err) {
				return next(err);
			}
			res.json(docs);
		});
	},

	addCategory: (req, res, next) => {
		const {
			name,
			slug,
		} = req.body;
		const category = new Category({
			name,
			slug
		});

		category.save((err, doc) => {
			if (err) {
				return next(err);
			}
			res.json(doc);
		});
	},

	getCategory: (req, res, next) => {
		res.json(req.doc);
	},

	updateCategory: (req, res, next) => {
		const {
			name,
			slug
		} = req.body;
		req.doc.update({
			name,
			slug
		}, (err, raw) => {
			if (err) {
				return next(err);
			}
			res.end();
		});
	},

	deleteCategory: (req, res, next) => {
		req.doc
			.remove()
			.then(() => res.end())
			.catch(err => {
				next(err);
			});
	},

	getCategoryById: (req, res, next, id) => {
		Category.findOne({
			_id: id
		}, (err, doc) => {

			if (err) {
				return next(err);
			}

			if (!doc) {
				return next(new Error('Document not exist!'));
			}

			req.doc = doc;
			next();
		})
	}
}