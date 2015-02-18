

var _ = require('lodash');
require('underscore.haz')(_);
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

      var title =
        _.haz(t, 'highlight.title') ?
        t.highlight.title[0] :
        t._source.title;

      var author =
        _.haz(t, 'highlight.author') ?
        t.highlight.author[0] :
        t._source.author;

      return (
        <li>
          <div dangerouslySetInnerHTML={{__html: title}}></div>
          <div dangerouslySetInnerHTML={{__html: author}}></div>
        </li>
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
