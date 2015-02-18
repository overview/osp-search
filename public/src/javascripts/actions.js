

module.exports = {


  /**
   * Apply a new query string.
   *
   * @param {String} q - The query from the search box.
   */
  query: function(q) {
    this.dispatch('QUERY', q);
  }


};
