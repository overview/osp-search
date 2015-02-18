

var Fluxxor = require('fluxxor');
var React = require('react');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * On startup, execute the empty query.
   */
  componentDidMount: function() {
    this.getFlux().actions.query('')
  },


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
    this.getFlux().actions.query(event.target.value)
  }


});
