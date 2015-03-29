

var Fluxxor = require('fluxxor');
var React = require('react');
var ResultList = require('./result-list');
var SearchBox = require('./search-box');
var Map = require('./map');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the top-level application structure.
   */
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div id="search" className="region">

            <div className="media page-header">

              <div className="media-left">
                <img src="/src/images/osp.jpg" />
              </div>

              <div className="media-body">
                <h2 className="media-heading">Open Syllabus Project</h2>
                <small>Harvard Library Open Metadata</small>
              </div>

            </div>

            <SearchBox />
            <ResultList />

          </div>

          <div id="map" className="region">
            <Map />
          </div>

        </div>
      </div>
    );
  }


});
