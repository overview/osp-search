

var search = require('../app/controllers/search');
var api = require('../app/controllers/api');


module.exports = function(app) {
  app.get('/', search.index);
  app.get('/api/texts', api.texts);
  app.get('/api/institutions', api.institutions);
  app.get('/api/counts', api.counts);
};
