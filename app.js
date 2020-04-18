var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addRouter = require('./routes/add');
var getRouter = require('./routes/get');
var OperateRouter = require('./routes/operate'); 
var DeleteRouter=require('./routes/delete');
var SearchRouter=require('./routes/search');
const mqtt = require ('mqtt');
// var MQTT_client = require('./mqtt');



mongoose.connect('mongodb://himanshu:bohemiaaka1@stolencar-shard-00-00-8s6qk.mongodb.net:27017,stolencar-shard-00-01-8s6qk.mongodb.net:27017,stolencar-shard-00-02-8s6qk.mongodb.net:27017/test?ssl=true&replicaSet=Stolencar-shard-0&authSource=admin&retryWrites=true&w=majority');
var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.subscribe(['testConnection','home/Bedroom/TV'], function (err) {
    if (!err) {
      client.publish('testConnection', 'MQTT is Working Fine')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString(),topic)
  // client.end()
})// parse application/x-www-form-urlencoded


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/add', addRouter);
app.use('/api/get', getRouter);
app.use('/api/operate', OperateRouter);
app.use('/api/delete', DeleteRouter);
app.use('/api/search', SearchRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
