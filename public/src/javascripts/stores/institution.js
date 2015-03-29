

var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SELECT: 'onSelect'
  },


  /**
   * Filter institutions by text.
   *
   * @param {String} id - The HLOM control number.
   */
  onSelect: function(id) {
    console.log(id);
  }


});
