//express_demo.js 文件
var Model = require('./models');
var config = require('./config');
var router = require('./router');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);
var path = require('path');
var ejs = require('ejs');  
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser(config.session_secret));
app.use(session({
    secret: config.session_secret,//与cookieParser中的一致
    resave: true,
    saveUninitialized:true,
    cookie: {
        maxAge: config.session_time,
    },
   //  store: new RedisStore({
	  //   port: config.redis_port,
	  //   host: config.redis_host,
	  //   db: config.redis_db,
	  //   pass: config.redis_password,
	  // }),
}));

app.set("views", config.static);
app.engine("html",ejs.__express);
app.set("view engine","html");
app.set('env', 'production');

app.use(express.static(path.join(__dirname, config.static)));
app.get('/', function(req, res){
	res.render('index');
})


app.use('/', router)

var server = app.listen(config.port, function () {
 
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
  
})

module.exports = app;