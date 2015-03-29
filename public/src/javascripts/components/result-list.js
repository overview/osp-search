

var _ = require('lodash');
var $ = require('jquery');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var ResultRow = require('./result-row');
require('underscore.haz')(_);


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

    // Loading spinner.
    if (_.isNull(this.state.texts)) {

      var spinnerCx = React.addons.classSet({
        'fa': true,
        'fa-spin': true,
        'fa-circle-o-notch': true,
        'spinner': true
      });

      return <i className={spinnerCx}></i>;

    }

    // Get the result count.
    var total = Number(this.state.texts.total);

    // No results.
    if (total == 0) {
      return <h3>No results</h3>;
    }

    else {

      // Build up the list of result rows.
      var texts = _.map(this.state.texts.hits, function(t) {
        return <ResultRow hit={t} key={t._id} />;
      });

      var tableCx = React.addons.classSet({
        'table': true,
        'table-striped': true,
        'table-condensed': true,
        'table-hover': true
      });

      return (
        <div id="results">

          <h3 className="hit-count">
            <span className="count">
              {total.toLocaleString()}
            </span> results:
          </h3>

          <table className={tableCx}>
            <thead>
              <th>Rank</th>
              <th>Percentile</th>
              <th>Count</th>
              <th>Text</th>
            </thead>
            <tbody>
              {texts}
            </tbody>
          </table>

        </div>
      );

    }

  }


});
