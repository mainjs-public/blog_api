const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	jwt.verify(req.headers.authorization, 'abc123456', function(err, decoded) {
		if (err) {
			return next(err);
		}
		next();
	});
}