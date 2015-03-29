

var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SELECT: 'onSelect'
  },


  /**
   * Filter institutions by text.
   *
   * @param {String} cn - The HLOM control number.
   */
  onSelect: function(cn) {
    console.log(cn);
  }


});
