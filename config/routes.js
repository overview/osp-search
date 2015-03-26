

var search = require('../app/controllers/search');
var api = require('../app/controllers/api');


module.exports = function(app) {
  app.get('/', search.index);
  app.get('/query', api.query);
};
