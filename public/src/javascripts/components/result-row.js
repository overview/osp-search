

var _ = require('lodash');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var chroma = require('chroma-js');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render an individual text.
   */
  render: function() {

    var colorStyle = {
      color: this._color()
    };

    return (
      <tr className="text" onClick={this.onClick}>

        <td className="rank">{this._rank()}</td>

        <td style={colorStyle} className="percentile">
          {this._percentile()}
        </td>

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
   * Get a green -> red color, based on percentile.
   */
  _color: function() {
    var scale = chroma.scale(['red', 'green']).mode('lab');
    var ratio = Number(this.props.hit._source.percent)/100;
    return scale(ratio).hex()
  },


  /**
   * Author field.
   */
  _author: function() {
    return this._getHighlight('author');
  },


  /**
   * Title field.
   */
  _title: function() {
    return this._getHighlight('title');
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
   * Teaching percentile field.
   */
  _percentile: function() {
    var percentile = this.props.hit._source.percent;
    return Number(percentile).toFixed(2)+'%';
  },


  /**
   * Teaching rank field.
   */
  _rank: function() {
    var rank = this.props.hit._source.rank;
    return Number(rank).toLocaleString();
  }


});
