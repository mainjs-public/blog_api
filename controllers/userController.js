const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');


module.exports = {
	register: (req, res, next) => {
		// res.send('register');

		const {
			name,
			email,
			password
		} = req.body;


		const user = new User({
			name,
			email,
			password
		});

		user.save((err, doc) => {
			if (err) {
				return next(err);
			}
			res.json(doc);
		});

	},

	login: (req, res, next) => {
		const {
			email,
			password
		} = req.body;

		User.findOne({
			email
		}, (err, doc) => {
			if (err) {
				return next(err);
			}

			if (!doc) {
				return next(new Error("can't found user."));
			}

			doc.comparePassword(password, function(err, info) {

				if (err) {
					return next(err);
				}

				if (!info) {
					return next(new Error('password not match'));
				}

				const token = jwt.sign({ user_id: doc._id }, 'abc123456');

				res.json({
					token: token
				});

			});

		});

	},

	private: (req, res, next) => {
		res.send('private');
	}
}