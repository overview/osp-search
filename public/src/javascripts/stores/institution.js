

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

    this.institutions = null;
    this.counts = null;

    // Load institutions.
    $.ajax({
      dataType: 'json',
      url: '/api/institutions',
      success: function(res) {
        self.institutions = res;
        self.emit('change');
        self.onSelect();
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

    // Don't reload the same counts.
    if (cn == this.cn && this.counts) return;

    // Show the spinner.
    this.counts = null;
    this.emit('change');

    // Load new counts.
    $.ajax({
      dataType: 'json',
      url: '/api/counts',
      data: { cn: cn },
      success: function(res) {
        self.counts = res;
        self.emit('change');
      }
    });

    this.cn = cn;

  }


});
