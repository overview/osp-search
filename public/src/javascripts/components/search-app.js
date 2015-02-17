

var React = require('react');
var SearchBox = require('./search-box');


module.exports = React.createClass({


  /**
   * Render the top-level application structure.
   */
  render: function() {
    return (
      <div className="container">

        <div className="page-header">
          <h2>
            <span>Open Syllabus Project</span>&nbsp;
            <small>Harvard Open Metadata</small>
          </h2>
        </div>

        <SearchBox />

      </div>
    );
  }


});
