var express = require('express');
var multer = require('multer');
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + "-" + file.originalname);
  }
})

var upload = multer({ storage: storage });

router.post('/',  upload.single('image'), function(req, res, next) {
  res.json({
  	link: '/images/' + req.file.filename
  });
});

module.exports = router;
