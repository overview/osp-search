

var _ = require('lodash');
var Fluxxor = require('fluxxor');
var React = require('react');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('TextStore')
  ],


  /**
   * Get the current hits.
   */
  getStateFromFlux: function() {
    return {
      texts: this.getFlux().store('TextStore').texts
    };
  },


  /**
   * Render the search results.
   */
  render: function() {

    var texts = _.map(this.state.texts.hits, function(t) {
      return (
        <li>{t._source.title}</li>
      );
    });

    return (
      <div className="results">
        <h4>{this.state.texts.total} texts</h4>
        <ul className="result-list">{texts}</ul>
      </div>
    );

  }


});
