

var path = require('path');
var favicon = require('serve-favicon');
var express = require('express');


module.exports = function(app) {

  var root = path.normalize(__dirname+'/../..');
  var env = process.env.NODE_ENV || 'development';

  // Assign the port.
  app.set('port', process.env.PORT || 3000);

  // Serve the favicon.
  app.use(favicon(root+'/favicon.ico'));

  // Set the static asset root.
  app.use(express.static(root+'/public'));

  // Set the template directory.
  app.set('views', root+'/app/views');
  app.set('view engine', 'jade');

  // Inject the livereload snippet.
  if (env == 'development') {
    app.use(require('connect-livereload')());
  }

}
