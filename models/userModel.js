const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		index: true,
   		unique: true
	},
	password: String,
});

userSchema.pre('save', function(next) {
	const user = this;
	bcrypt.genSalt((err, salt) => {
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	})
});

userSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, cb);
}

module.exports = mongoose.model('User', userSchema);