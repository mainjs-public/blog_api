const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ 
	name: String,
	slug: {
		type: String,
		index: true,
		unique: true,
	},
	image: String,
	content: String,
	description: String,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	created: Date,
	updated: Date
});


module.exports = mongoose.model('Blog', blogSchema);