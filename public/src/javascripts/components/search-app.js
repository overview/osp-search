

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
      <div className="container">
        <div className="row">

          <div className="search col-md-7">

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

          <div id="map" className="col-md-5">
            <Map />
          </div>

        </div>
      </div>
    );
  }


});
