

var React = require('react');


module.exports = React.createClass({


  /**
   * Render the search box.
   */
  render: function() {
    return (
      <input
        className="form-control"
        type="text"
        placeholder="Search texts"
        onChange={this.onChange}
      />
    );
  },


  /**
   * When the search query is changed.
   */
  onChange: function(event) {
    console.log(event.target.value);
  }


});
