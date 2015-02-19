

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

    var texts = _.map(this.state.texts.hits, function(t) {
      return <ResultRow hit={t} />;
    });

    var tableCx = React.addons.classSet({
      'table': true,
      'table-striped': true,
      'table-condensed': true,
      'table-hover': true
    });

    return (
      <div className="results">

        <h3>{this.state.texts.total} results:</h3>

        <table className={tableCx}>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {texts}
          </tbody>
        </table>

      </div>
    );

  }


});
