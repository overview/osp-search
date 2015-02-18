

var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * When a new query string is entered.
   *
   * @param {String} query - The query string.
   */
  onQuery: function(query) {
    console.log(query);
    // TODO: Execute the query.
  }


});
