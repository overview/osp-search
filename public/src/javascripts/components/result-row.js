

var _ = require('lodash');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var chroma = require('chroma-js');


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

    // Is the row currently selected?
    var id = this.props.hit._source.stored_id;
    var selected = (this.state.selected == id);

    var trCx = React.addons.classSet({
      'text': true,
      'success': selected
    });

    var colorStyle = {
      color: this._color()
    };

    return (
      <tr className={trCx} onClick={this.onClick}>

        <td style={colorStyle} className="percentile">
          {this._percentile()}
        </td>

        <td className="rank">{this._rank()}</td>
        <td className="count">{this._count()}</td>

        <td className="text">
          <div className="header">

            <div
              className="title"
              dangerouslySetInnerHTML={{__html: this._title()}}>
            </div>

            <div
              className="author"
              dangerouslySetInnerHTML={{__html: this._author()}}>
            </div>

            <div
              className="publisher"
              dangerouslySetInnerHTML={{__html: this._publisher()}}>
            </div>

          </div>
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
   * If a field is highlighted, get the highlighted value. If not, fall back
   * on the raw field value.
   *
   * @param {String} field - The field key.
   */
  _getHighlight: function(field) {

    var path = 'highlight.'+field

    return _.haz(this.props.hit, path) ?
      this.props.hit.highlight[field][0] :
      this.props.hit._source[field];

  },


  /**
   * Title field.
   */
  _title: function() {
    return this._getHighlight('title');
  },


  /**
   * Author field.
   */
  _author: function() {
    return this._getHighlight('author');
  },


  /**
   * Publisher field.
   */
  _publisher: function() {
    return this._getHighlight('publisher');
  },


  /**
   * Assignment count field.
   */
  _count: function() {
    var count = this.props.hit._source.count;
    return Number(count).toLocaleString();
  },


  /**
   * Assignment percentile field.
   */
  _percentile: function() {
    var percentile = this.props.hit._source.percentile;
    return Number(percentile).toFixed(2)+'%';
  },


  /**
   * Assignment rank field.
   */
  _rank: function() {
    var rank = this.props.hit._source.rank;
    return Number(rank).toLocaleString();
  },


  /**
   * Get a green -> red color, based on percentile.
   */
  _color: function() {
    var scale = chroma.scale(['red', 'green']).mode('lab');
    var ratio = Number(this.props.hit._source.percentile)/100;
    return scale(ratio).hex()
  }


});
