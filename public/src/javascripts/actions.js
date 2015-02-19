

module.exports = {


  /**
   * Apply a new query string.
   *
   * @param {Object} opts - The query options.
   */
  query: function(opts) {
    this.dispatch('QUERY', opts);
  }


};
