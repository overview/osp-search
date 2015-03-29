

var $ = require('jquery');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SELECT: 'onSelect'
  },


  /**
   * Filter institutions by text.
   */
  initialize: function() {

    var self = this;

    // Load institutions.
    $.ajax({
      dataType: 'json',
      url: '/api/institutions',
      success: function(res) {
        self.institutions = res;
        self.emit('change');
      }
    });

  },


  /**
   * Filter institutions by text.
   *
   * @param {String} cn - The HLOM control number.
   */
  onSelect: function(cn) {

    var self = this;

    $.ajax({
      dataType: 'json',
      url: '/api/counts',
      data: { cn: cn },
      success: function(res) {
        self.counts = res;
        self.emit('change');
      }
    });

  }


});
