const Blog = require('../models/blogModel');

module.exports = {
	getAllBlogs: (req, res, next) => {

		let { limit, skip } = req.query;

		limit = !limit ? 100 : parseInt(limit);
		skip = !skip ? 0 : parseInt(skip);

		Blog.find({}, null, {limit, skip, sort: { created: -1 }}, (err, docs) => {
			if (err) {
				return next(err);
			}
			res.json(docs);
		});
	},

	addBlog: (req, res, next) => {
		const {
			name,
			slug,
			content,
			description,
			category,
			image,
		} = req.body;
		const blog = new Blog({
			name,
			slug,
			content,
			description,
			category,
			image,
			created: new Date(),
			updated: new Date()
		});

		blog.save((err, doc) => {
			if (err) {
				return next(err);
			}
			res.json(doc);
		});
	},

	getBlog: (req, res, next) => {
		res.json(req.doc);
	},

	updateBlog: (req, res, next) => {
		req.doc.update(req.body, (err, raw) => {
			if (err) {
				return next(err);
			}
			res.end();
		});
	},

	deleteBlog: (req, res, next) => {
		req.doc
			.remove()
			.then(() => res.end())
			.catch(err => {
				next(err);
			});
	},

	getBlogById: (req, res, next, id) => {

		const { slug } = req.query;

		const query = slug ? { slug }: { _id: id };

		Blog.findOne(query, (err, doc) => {

			if (err) {
				return next(err);
			}

			if (!doc) {
				return next(new Error('Document not exist!'));
			}

			req.doc = doc;
			next();
		})
	},

}