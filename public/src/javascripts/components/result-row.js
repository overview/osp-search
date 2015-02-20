

var _ = require('lodash');
var React = require('react/addons');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('OverviewStore')
  ],


  /**
   * Get the current hits.
   */
  getStateFromFlux: function() {
    return {
      selected: this.getFlux().store('OverviewStore').selected
    };
  },


  /**
   * Render an individual text.
   */
  render: function() {

    var hit = this.props.hit;

    // Format the integers.
    var count = Number(hit._source.count).toLocaleString();
    var rank  = Number(hit._source.rank).toLocaleString();

    // Hit-highlight "title".
    var title =
      _.haz(hit, 'highlight.title') ?
      hit.highlight.title[0] :
      hit._source.title;

    // Hit-highlight "author".
    var author =
      _.haz(hit, 'highlight.author') ?
      hit.highlight.author[0] :
      hit._source.author;

    // Is the row currently selected?
    this.selected = this.state.selected == hit._source.stored_id;

    var trCx = React.addons.classSet({
      'text': true,
      'success': this.selected
    });

    return (
      <tr
        className={trCx}
        onClick={this.onClick}>

        <td
          className="count"
          dangerouslySetInnerHTML={{__html: count}}>
        </td>

        <td
          className="rank"
          dangerouslySetInnerHTML={{__html: rank}}>
        </td>

        <td
          className="title"
          dangerouslySetInnerHTML={{__html: title}}>
        </td>

        <td
          className="author"
          dangerouslySetInnerHTML={{__html: author}}>
        </td>

      </tr>
    );

  },


  /**
   * When a text row is clicked.
   */
  onClick: function() {

    // Apply the new selection.
    this.getFlux().actions.select(
      this.props.hit._source.stored_id,
      this.props.hit._source.title
    );

  }


});
