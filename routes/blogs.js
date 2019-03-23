var express = require('express');
var router = express.Router();

const data = [
	{ id: 1, name: 'Blog 1', description: 'description ......', content: 'content ....' },
	{ id: 2, name: 'Blog 2', description: 'description ......', content: 'content ....' },
	{ id: 3, name: 'Blog 3', description: 'description ......', content: 'content ....' },
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(data);
});

// router.get('/:blogId(\d+)', function(req, res, next) {
//   res.json(req.query);
// });

module.exports = router;

