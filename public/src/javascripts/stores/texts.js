

var _ = require('lodash');
var Fluxxor = require('fluxxor');
var es = require('elasticsearch');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * Spin up the Elasticsearch client.
   */
  initialize: function() {

    this.texts = [];

    this.client = new es.Client({
      host: 'localhost:9201' // TODO: envify.
    });

    // Debounce the query handler.
    this.onQuery = _.debounce(this.onQuery, 200);

  },


  /**
   * Execute a search query.
   *
   * @param {String} opts - Query options.
   */
  onQuery: function(opts) {
    var store = this;
  }


});
