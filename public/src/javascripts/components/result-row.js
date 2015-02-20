

var _ = require('lodash');
var Fluxxor = require('fluxxor');
var React = require('react');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React)
  ],


  /**
   * Render an individual text.
   */
  render: function() {

    var hit = this.props.hit;

    // Format the integers.
    var count = Number(hit._source.count).toLocaleString();
    var rank  = Number(hit._source.rank).toLocaleString();

    var title =
      _.haz(hit, 'highlight.title') ?
      hit.highlight.title[0] :
      hit._source.title;

    var author =
      _.haz(hit, 'highlight.author') ?
      hit.highlight.author[0] :
      hit._source.author;

    return (
      <tr
        className="text"
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

    // Get the Overview ID and HLOM title.
    var id = this.props.hit._source.stored_id;
    var title = this.props.hit._source.title;

    this.getFlux().actions.select(id, title);

  }


});
