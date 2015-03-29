

var $ = require('jquery');
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

    $.ajax({
      dataType: 'json',
      url: '/api/counts',
      data: { cn: cn },
      success: function(res) {
        console.log(res);
      }
    });

  }


});
