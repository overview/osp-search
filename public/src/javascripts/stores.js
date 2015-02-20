

var TextStore = require('./stores/texts');
var OverviewStore = require('./stores/overview');


module.exports = {
  TextStore: new TextStore(),
  OverviewStore: new OverviewStore()
};
