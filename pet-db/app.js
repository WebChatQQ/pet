var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var shopRouter = require('./routes/shop');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var myseverRouter = require('./routes/mysever');
var goodRouter = require('./routes/good');
var testRouter = require('./routes/test');
var petRouter = require('./routes/pet');
var addrRouter = require('./routes/addr');
var orderRouter = require('./routes/order');
var relatedRouter = require('./routes/related');
var statisticRouter = require('./routes/statistic');
var tourRouter = require('./routes/tour');
var carRouter = require('./routes/car');


require('./dao/db.js')
const jwtAuth = require('./utils/authToken')
var app = express();





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// app.use(jwtAuth);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/mysever', myseverRouter);
app.use('/good', goodRouter);
app.use('/shop', shopRouter);
app.use('/test', testRouter);
app.use('/pet', petRouter);
app.use('/addr', addrRouter);
app.use('/order', orderRouter);
app.use('/related', relatedRouter);
app.use('/statistic', statisticRouter);
app.use('/tour', tourRouter); 
app.use('/car', carRouter); 


app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
