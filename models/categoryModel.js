const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ 
	name: String,
	slug: String,
}, {
	collection: 'categoris'
});

module.exports = mongoose.model('Category', blogSchema);