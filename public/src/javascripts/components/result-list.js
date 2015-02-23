

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
          <tbody>
            {texts}
          </tbody>
        </table>

      </div>
    );

  }


});
