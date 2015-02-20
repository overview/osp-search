

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

    // Merge custom options.
    var defOpts = { qs: null, from: 0 };
    opts = _.merge(defOpts, opts);

    // If a query string is defined, search title and body.
    if (!_.isNull(opts.qs)) {
      var query = {
        multi_match: {
          query: opts.qs,
          fields: ['title', 'author'],
          type: 'best_fields'
        }
      };
    }

    // Otherwise, load all documents.
    else {
      var query = {
        match_all: {}
      };
    }

    this.client.search({
      index: 'hlom',
      type: 'record',
      size: 500,
      from: opts.from,
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
    });

  }


});
