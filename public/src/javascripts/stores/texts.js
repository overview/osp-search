

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
   * @param {String} qs - The query string.
   */
  onQuery: function(qs) {

    var store = this;
    var query;

    // If a query string is defined, search title and body.
    if (!_.isNull(qs)) {
      query = {
        multi_match: {
          query: qs,
          fields: ['title', 'author'],
          type: 'best_fields'
        }
      };
    }

    // Otherwise, load all documents.
    else {
      query = {
        match_all: {}
      };
    }

    this.client.search({
      index: 'hlom',
      type: 'record',
      size: 100,
      body: {
        query: query,
        sort: [
          { count: { order: 'desc' }},
          '_score'
        ],
        highlight: {
          fields: {
            title: {
              number_of_fragments: 1,
              fragment_size: 1000
            },
            author: {
              number_of_fragments: 1,
              fragment_size: 1000
            }
          }
        }
      }
    })

    .then(function(res) {
      store.texts = res.hits;
      store.emit('change');
    })

  }


});
