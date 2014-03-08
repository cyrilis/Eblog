
/**
 * Module dependencies.
 */
"use strict";

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// all environments
var port = process.argv.indexOf('-p')? +process.argv[process.argv.indexOf('-p')+1]:undefined;
app.set('port', process.env.PORT || port || 2000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: './public/images/upload'
}));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        db: settings.db
    })
}));

app.use(express.static(path.join(__dirname, 'public')));
// Lab source
app.use(express.static(path.join(__dirname, 'lab')));
// Route the App
app.use(app.router);
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
module.exports = app;
http.createServer(app).listen(app.get('port'),'127.0.0.1', function(){
    console.log('Express server listening on port ' + app.get('port') + ' in '+ app.get('env') + " mode");
});
