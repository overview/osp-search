

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
   * @param {String} query - The query string.
   */
  onQuery: function(query) {

    var store = this;

    this.client.search({
      index: 'hlom',
      type: 'record',
      size: 100,
      body: {
        query: {
          query_string: {
            query: query
          }
        },
        sort: [
          {count: {order: 'desc'}},
          '_score'
        ]
      }
    })

    .then(function(res) {
      store.texts = res.hits;
      store.emit('change');
    })

  }


});
