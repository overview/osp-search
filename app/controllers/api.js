

var _ = require('lodash');
var es = require('elasticsearch');


/**
 * Run a search query.
 */
exports.query = function(req, res) {

  var client = new es.Client({
    host: 'localhost:9200' // TODO: envify.
  });

  // Search title / author / publisher, when query is defined.
  if (!_.isEmpty(req.query.qs)) {
    var query = {
      multi_match: {
        query: req.query.qs,
        fields: ['_all'],
        type: 'phrase_prefix'
      }
    };
  }

  // Otherwise, load all documents.
  else {
    var query = {
      match_all: {}
    };
  }

  client.search({
    index: 'hlom',
    type: 'record',
    size: 500,
    body: {
      query: query,
      sort: [
        { count: { order: 'desc' }},
        '_score'
      ],
      highlight: {
        fields: {
          title: {
            number_of_fragments: 1,
            fragment_size: 1000
          },
          author: {
            number_of_fragments: 1,
            fragment_size: 1000
          },
          publisher: {
            number_of_fragments: 1,
            fragment_size: 1000
          }
        }
      }
    }
  })

  .then(function(result) {
    res.send(result);
  });

};
