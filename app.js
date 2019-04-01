var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const fs = require('fs');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

const Category = require('./models/categoryModel');

const { dbUri } = require('./config/mongodb');

var app = express();

// Connect mongodb
mongoose.connect(dbUri,  { useNewUrlParser: true });
mongoose.connection
	.once('open', () => console.log('connected'))
	.on('error', (error) => console.log(error));

// const blog = new Blog({ name: 'Blog name ....' });

// blog.save((err, doc) => {
// 	console.log(err, doc);
// });

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build'), { index: false }));

app.use('/api/v1', indexRouter);
app.get('/*', function(req, res) {

	fs.readFile(__dirname + '/build/index.html', 'utf8', function(err, html) {
		if (err) {
			res.json(err);
		}

		Category.find({ }, (err, categoris) => {

			if (err) {
				res.json(err);
			}

			html = html.replace('__MENU__', JSON.stringify(categoris));

			res.end(html);

		});
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
