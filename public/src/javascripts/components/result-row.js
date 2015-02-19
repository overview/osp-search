

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

    var title =
      _.haz(hit, 'highlight.title') ?
      hit.highlight.title[0] :
      hit._source.title;

    var author =
      _.haz(hit, 'highlight.author') ?
      hit.highlight.author[0] :
      hit._source.author;

    return (
      <li>

        <span
          className="title"
          dangerouslySetInnerHTML={{__html: title}}>
        </span>

        <span
          className="author"
          dangerouslySetInnerHTML={{__html: author}}>
        </span>

      </li>
    );

  }


});
