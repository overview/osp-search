

var Fluxxor = require('fluxxor');
var React = require('react');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    React.addons.LinkedStateMixin
  ],


  /**
   * By default, empty query.
   */
  getInitialState: function() {
    return { query: null }
  },


  /**
   * On startup, execute the empty query.
   */
  componentDidMount: function() {
    this.getFlux().actions.query();
  },


  /**
   * Render the search box.
   */
  render: function() {
    return (

      <div className="input-group">

        <input
          className="search form-control"
          type="text"
          placeholder="Search texts"
          valueLink={this.linkState('query')}
          onKeyPress={this.onKeyPress}
        />

        <span className="input-group-btn">
          <button
            className="btn btn-default"
            onClick={this.query}>Search</button>
        </span>

      </div>

    );
  },


  /**
   * Search on "Enter" keypress.
   */
  onKeyPress: function(event) {
    if (event.key == 'Enter') {
      this.query()
    }
  },


  /**
   * Execute the current query.
   */
  query: function() {
    this.getFlux().actions.query(this.state.query);
  }


});
