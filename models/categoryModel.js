const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ 
	name: String,
	slug: {
		type: String,
		index: true,
		unique: true,
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}]
}, {
	collection: 'categoris'
});

module.exports = mongoose.model('Category', blogSchema);