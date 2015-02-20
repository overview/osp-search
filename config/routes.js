

var overview = require('../app/controllers/overview');


module.exports = function(app) {
  app.get('/metadata', overview.metadata);
  app.get('/show', overview.show);
  app.get('/query', overview.query);
};
