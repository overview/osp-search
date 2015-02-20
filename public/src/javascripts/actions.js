

module.exports = {


  /**
   * Apply a new query string.
   *
   * @param {String} qs - The query string.
   * @param {Number} start - Start offset.
   */
  query: function(qs, start) {
    this.dispatch('QUERY', { qs: qs, start: start });
  }


};
