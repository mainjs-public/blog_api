var express = require('express');
var router = express.Router();

const userRouter = require('./userRouter');
const blogRouter = require('./blogRouter');
const categoryRouter = require('./categoryRouter');
const uploadRouter = require('./uploadRouter');

router.use('/users', userRouter);
router.use('/blogs', blogRouter);
router.use('/categories', categoryRouter);
router.use('/upload', uploadRouter);

module.exports = router;
