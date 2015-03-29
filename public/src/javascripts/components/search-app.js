

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

            <div className="page-header">
              <h2>
                <img src="/src/images/osp.jpg" />
                <span>Open Syllabus Project</span>&nbsp;
                <small>Harvard Open Metadata</small>
              </h2>
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
