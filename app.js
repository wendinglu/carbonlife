
/**
 * Module dependencies.
 */

var express = require('express')
  , Sequelize = require('sequelize')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//Database
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres'
});

//Configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Routes
app.get('/', routes.index);
app.get('/users', user.list);

app.get('/', function(req, res) {
  res.send("hello world");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
