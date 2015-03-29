

var $ = require('jquery');
var _ = require('lodash');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery',
    SELECT: 'onSelect'
  },


  /**
   * Spin up the Elasticsearch client.
   */
  initialize: function() {

    this.texts = null;

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

    // Show the spinner.
    this.texts = null;
    this.emit('change');

    $.ajax({
      dataType: 'json',
      url: '/query',
      data: opts,
      success: function(res) {
        store.texts = res.hits;
        store.emit('change');
      }
    });

  },


  /**
   * Select a text.
   *
   * @param {String} id - The document _id.
   */
  onSelect: function(id) {
    this.selected = id;
    this.emit('change');
  }


});
