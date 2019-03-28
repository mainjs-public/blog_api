const Blog = require('../models/blogModel');

module.exports = {
	getAllBlogs: (req, res, next) => {
	  	Blog.find({}, (err, docs) => {
	  		if (err) {
	  			return next(err);
	  		}
	  		res.json(docs);
	  	});
	},

	addBlog: (req, res, next) => {
		const { name, slug, content, description } = req.body;
		const blog = new Blog({
		 name,
		  slug,
		   content,
		    description,
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
		const { name } = req.body;
		req.doc.update({ name }, (err, raw) => {
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
		Blog.findOne({ _id: id }, (err, doc) => {

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