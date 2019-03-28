var express = require('express');
var router = express.Router();

var multer  = require('multer');

var upload = multer({ dest: 'public/images' });

router.post('/',  upload.single('image'), function(req, res, next) {
  // res.json({ files: req.file });
  var imagePath = '/images/' + req.file.filename;
  res.end("<img src=" + imagePath + " />")
});

module.exports = router;
