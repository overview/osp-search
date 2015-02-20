

var _ = require('lodash');
var QueryString = require('querystring');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SELECT: 'onSelect'
  },


  /**
   * Spin up the Elasticsearch client.
   */
  initialize: function() {

    this.selected = null;

    // Get server / API key from URL.
    this.params = QueryString.parse(
      window.location.search.substr(1)
    );

  },


  /**
   * Filter documents by HLOM text.
   *
   * @param {Object} opts - Selection options.
   */
  onSelect: function(opts) {

    var msg = {
      call: 'setDocumentListParams',
      args: [{
        objects: String(opts.id),
        name: 'assign "'+opts.title+'"'
      }]
    };

    window.parent.postMessage(
      msg, this.params.server
    );

    this.selected = opts.id;
    this.emit('change');

  }


});
