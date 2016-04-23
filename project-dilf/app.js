var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    contentLength = require('express-content-length-validator');
var hbs = require('hbs');


var routes = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// builtin
var fs = require('fs');
//register hbs partials
hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials');
// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// app.use(express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("thisIsARandomlyWrittenLongSecretToSignTheCookiesWith!-:)"));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(contentLength.validateMax({
    max:9999,
    status: 400,
    message: 'Content length is too large. Stop it!'
}));

app.use(helmet());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
