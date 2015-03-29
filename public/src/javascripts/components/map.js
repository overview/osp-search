

var L = require('leaflet');
var Fluxxor = require('fluxxor');
var React = require('react');


module.exports = React.createClass({


  /**
   * Render the container.
   */
  render: function() {
    return <div id="leaflet"></div>;
  },


  /**
   * Start the map.
   */
  componentDidMount: function() {
    this._initLeaflet();
  },


  /**
   * Initialize the Leaflet instance.
   */
  _initLeaflet: function() {

    this.map = L.map(this.getDOMNode());

    // Create an OSM tile layer.
    var url = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    L.tileLayer(url).addTo(this.map);

    // TODO: Where to focus?
    this.map.setView([40.73, -73.93], 6)

  }


});
