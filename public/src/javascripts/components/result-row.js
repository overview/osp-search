

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

    // Format the fields.
    var count   = Number(hit._source.count).toLocaleString();
    var rank    = Number(hit._source.rank).toLocaleString();
    var author  = this._getHighlight('author');
    var title   = this._getHighlight('title');

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
    this.getFlux().actions.select(
      this.props.hit._source.stored_id,
      this.props.hit._source.title
    );
  },


  /**
   * Return a field highlight, falling back on the raw field.
   *
   * @param {String} field - The field key.
   */
  _getHighlight: function(field) {

    var path = 'highlight.'+field

    return _.haz(this.props.hit, path) ?
      this.props.hit.highlight[field][0] :
      this.props.hit._source[field];

  }


});
