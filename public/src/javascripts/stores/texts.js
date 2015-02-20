

var $ = require('jquery');
var _ = require('lodash');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * Spin up the Elasticsearch client.
   */
  initialize: function() {

    this.texts = [];

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

    $.ajax({
      dataType: 'json',
      url: '/query',
      data: opts,
      success: function(res) {
        store.texts = res.hits;
        store.emit('change');
      }
    });

  }


});
