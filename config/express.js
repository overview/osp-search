

var path = require('path');
var express = require('express');


module.exports = function(app) {

  var root = path.normalize(__dirname+'/..');
  var env = process.env.NODE_ENV || 'development';

  // Assign the port.
  app.set('port', process.env.PORT || 3000);

  // Set the static asset root.
  app.use(express.static(root+'/public'));

  // Set the template directory.
  app.set('views', root+'/app/views');
  app.set('view engine', 'jade');

  // Inject the livereload snippet.
  if (env == 'development') {
    app.use(require('connect-livereload')());
  }

  // Allow cross-origin requests.
  app.use(require('cors')());

}
