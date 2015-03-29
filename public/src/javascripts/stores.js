

var TextStore = require('./stores/text');
var InstitutionStore = require('./stores/institution');


module.exports = {
  TextStore: new TextStore(),
  InstitutionStore: new InstitutionStore()
};
