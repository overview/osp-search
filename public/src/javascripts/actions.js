

module.exports = {


  /**
   * When a new query is entered.
   *
   * @param {String} qs - The query string.
   * @param {Number} start - Start offset.
   */
  query: function(qs, start) {
    this.dispatch('QUERY', { qs: qs, start: start });
  },


  /**
   * When a text is selected.
   *
   * @param {Number} id - The Overview id.
   */
  select: function(id) {
    this.dispatch('SELECT', id);
  }


};
