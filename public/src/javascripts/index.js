

var Fluxxor = require('fluxxor');
var React = require('react');
var SearchApp = require('./components/search-app.js');
var stores = require('./stores');
var actions = require('./actions');


// Create the Flux instance.
var flux = new Fluxxor.Flux(stores, actions);


React.render(
  <SearchApp flux={flux} />,
  document.getElementById('search')
);
