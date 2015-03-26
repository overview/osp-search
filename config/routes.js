

var index = require('../app/controllers/index');


module.exports = function(app) {
  app.get('/', index.show);
  app.get('/query', index.query);
};
