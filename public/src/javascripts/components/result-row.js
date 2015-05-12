

var _ = require('lodash');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var chroma = require('chroma-js');


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
      selected: this.getFlux().store('TextStore').selected
    };
  },


  /**
   * Render an individual text.
   */
  render: function() {

    var trCx = React.addons.classSet({
      'text': true,
      'success': (this.state.selected == this.props.hit._id)
    });

    var linRankPctColor = {
      color: this._color(this.props.hit._source.lin_rank_pct, 100)
    };
    var logRankPctColor = {
      color: this._color(this.props.hit._source.log_rank_pct, 100)
    };
    var linCountPctColor = {
      color: this._color(this.props.hit._source.lin_count_pct, 100)
    };
    var logCountPctColor = {
      color: this._color(this.props.hit._source.log_count_pct, 100)
    };
    var logRank10Color = {
      color: this._color(this.props.hit._source.log_rank_10, 10)
    };
    var logRank5Color = {
      color: this._color(this.props.hit._source.log_rank_5, 5)
    };
    var logCount10Color = {
      color: this._color(this.props.hit._source.log_count_10, 10)
    };
    var logCount5Color = {
      color: this._color(this.props.hit._source.log_count_5, 5)
    };

    return (
      <tr className={trCx} onClick={this.onClick}>

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

        <td className="lin-rank-pct" style={linRankPctColor}>
          {this._pct(this.props.hit._source.lin_rank_pct)}
        </td>

        <td className="log-rank-pct" style={logRankPctColor}>
          {this._pct(this.props.hit._source.log_rank_pct)}
        </td>

        <td className="lin-count-pct" style={linCountPctColor}>
          {this._pct(this.props.hit._source.lin_count_pct)}
        </td>

        <td className="log-count-pct" style={logCountPctColor}>
          {this._pct(this.props.hit._source.log_count_pct)}
        </td>

        <td className="log-rank-10" style={logRank10Color}>
          {this._star(this.props.hit._source.log_rank_10)}
        </td>

        <td className="log-count-10" style={logCount10Color}>
          {this._star(this.props.hit._source.log_count_10)}
        </td>

        <td className="log-rank-5" style={logRank5Color}>
          {this._star(this.props.hit._source.log_rank_5)}
        </td>

        <td className="log-count-5" style={logCount5Color}>
          {this._star(this.props.hit._source.log_count_5)}
        </td>

      </tr>
    );

  },


  /**
   * When a text row is clicked.
   */
  onClick: function(event) {
    this.getFlux().actions.select(this.props.hit._id);
    event.stopPropagation();
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
  _color: function(val, max) {
    var scale = chroma.scale(['#F04124', '#43ac6a']).mode('lab');
    return scale(val/max).hex()
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
   * Teaching rank field.
   */
  _rank: function() {
    var rank = this.props.hit._source.rank;
    return Number(rank).toLocaleString();
  },


  /**
   * Teaching percentile field.
   */
  _pct: function(pct) {
    return Number(pct).toFixed(2)+'%';
  },


  /**
   * Teaching percentile field.
   */
  _star: function(val) {
    return Number(val).toFixed(1);
  },


});
