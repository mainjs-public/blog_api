const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ 
	name: String,
	slug: String,
	created: Date,
	updated: Date,
	content: String,
	description: String,
	_category_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Blog', blogSchema);