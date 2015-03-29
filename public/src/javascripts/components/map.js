

var _ = require('lodash');
var L = require('leaflet');
var Fluxxor = require('fluxxor');
var React = require('react');
var markerTpl = require('./marker.jade');

require('leaflet.markercluster');
require('leaflet.heat');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('InstitutionStore')
  ],


  /**
   * Get institutions and counts.
   */
  getStateFromFlux: function() {

    var store = this.getFlux().store('InstitutionStore');

    return {
      institutions: store.institutions,
      counts: store.counts
    };

  },


  /**
   * Render the container.
   */
  render: function() {

    // Show markers when data is hydrated.
    if (this.state.institutions && this.state.counts) {
      this.renderMarkers();
    }

    var spinnerCx = React.addons.classSet({
      'fa': true,
      'fa-spin': true,
      'fa-circle-o-notch': true,
      'spinner': true,
      'hide': this.state.counts
    });

    return (
      <div id="map" className="region">
        <div id="leaflet"></div>
        <i className={spinnerCx}></i>
      </div>
    );

  },


  /**
   * Start the map.
   */
  componentDidMount: function() {
    this._initLeaflet();
    this._initMarkers();
    this._initHeatmap();
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

  },


  /**
   * Initialize the marker cluster group.
   */
  _initMarkers: function() {

    this.markers = new L.MarkerClusterGroup({

      iconCreateFunction: function(cluster) {

        var children = cluster.getAllChildMarkers();

        // Add the counts of all the children.
        count = _.reduce(children, function(s, m) {
          return s + m.options.count;
        }, 0);

        // Form the class.
        var c = 'marker-cluster-';
        if (count < 10) {
          c += 'small';
        } else if (count < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }

        return new L.DivIcon({
          html: '<div><span>'+count+'</span></div>',
          iconSize: new L.Point(40, 40),
          className: 'marker-cluster '+c
        });

      }

    });

    this.map.addLayer(this.markers);

  },


  /**
   * Initialize the heatmap.
   */
  _initHeatmap: function() {

    this.heatmap = L.heatLayer([], {
      minOpacity: 0.15
    });

    this.map.addLayer(this.heatmap);

  },


  /**
   * Render the marker clusters.
   */
  renderMarkers: function() {

    var self = this;

    this.markers.clearLayers();
    var points = [];

    _.each(this.state.counts, function(count, id) {

      var inst = self.state.institutions[id];
      if (!inst) return;

      // Create the marker.
      var marker = new L.Marker([inst.lat, inst.lon], {
        name: inst.institution,
        count: Number(count)
      });

      // Create the popup.
      var popup = markerTpl({
        institution: inst.institution,
        url: inst.url,
        campus: inst.campus
      });

      // Show the marker.
      self.markers.addLayer(marker);
      marker.bindPopup(popup);

      // Register the heatmap point.
      points.push(new L.latLng(inst.lat, inst.lon, count));

    });

    // Show the heatmap.
    this.heatmap.setLatLngs(points);

  },


});
