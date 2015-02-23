

var _ = require('lodash');
require('underscore.haz')(_);
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var ResultRow = require('./result-row');


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

    var total = Number(this.state.texts.total);

    // Build up the list of result rows.
    var texts = _.map(this.state.texts.hits, function(t) {
      return <ResultRow hit={t} key={t._id} />;
    });

    // Spinner.
    if (_.isEmpty(texts)) {

      var spinnerCx = React.addons.classSet({
        'fa': true,
        'fa-spin': true,
        'fa-circle-o-notch': true,
        'spinner': true
      });

      return <i className={spinnerCx}></i>

    }

    // Results.
    else {

      var tableCx = React.addons.classSet({
        'table': true,
        'table-striped': true,
        'table-condensed': true,
        'table-hover': true
      });

      return (
        <div className="results">

          <h3>{total.toLocaleString()} results:</h3>

          <table className={tableCx}>
            <thead>
              <th>Percentile</th>
              <th>Rank</th>
              <th>Count</th>
              <th></th>
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
