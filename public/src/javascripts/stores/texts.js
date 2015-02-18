

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
    this.client = new es.Client({
      host: 'localhost:9201' // TODO: envify.
    });
  },


  /**
   * When a new query string is entered.
   *
   * @param {String} query - The query string.
   */
  onQuery: function(query) {

    console.log(query);

    // TODO|dev
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
      console.log(res);
    })

  }


});
