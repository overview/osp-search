

var config = require('config');
var _ = require('lodash');
var es = require('elasticsearch');
var cache = require('memory-cache');
var pg = require('pg');
var Promise = require('bluebird');
var db = Promise.promisifyAll(pg);


/**
 * Query HLOM texts.
 */
exports.texts = function(req, res) {

  var client = new es.Client(
    _.clone(config.elasticsearch)
  );

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


/**
 * Get institution with documents.
 */
exports.institutions = function(req, res) {

  db
  .connectAsync(config.postgres)
  .spread(function(client, close) {

    client.queryAsync(
      "SELECT "+
      "DISTINCT(di.institution_id) as id, "+
      "i.metadata->'Institution_Name' as institution, "+
      "i.metadata->'Campus_Name' as campus, "+
      "i.metadata->'Institution_Web_Address' as url, "+
      "i.metadata->'Longitude' as lon, "+
      "i.metadata->'Latitude' as lat "+
      "FROM document_institution as di "+
      "LEFT JOIN institution as i "+
      "ON di.institution_id = i.id "+
      "WHERE i.metadata ? 'Latitude'"
    )

    .then(function(result) {

      // Map id -> institution.
      var institutions = _(result.rows)
        .pluck('id')
        .zipObject(result.rows)
        .value();

      res.send(institutions);
      close();

    });

  });

};


/**
 * Get institution counts.
 */
exports.counts = function(req, res) {

  db
  .connectAsync(config.postgres)
  .spread(function(client, close) {

    // Load counts for one text.
    if (req.query.cn) {

      // Get the HLOM record id with the passed control number.
      client.queryAsync(
        'SELECT id FROM hlom_record WHERE control_number = $1',
        [req.query.cn]
      )

      // Get all HLOM citation rows for the record.
      .then(function(result) {
        return client.queryAsync(
          'SELECT * FROM hlom_citation WHERE record_id = $1',
          [result.rows[0].id]
        );
      })

      // Try to find document -> institution rows for each doc.
      .then(function(result) {

        var docIds = _.map(result.rows, function(r) {
          return r.document_id;
        });

        return client.queryAsync(
          'SELECT * FROM document_institution WHERE '+
          'document_id = ANY($1::int[])',
          [docIds]
        );

      })

      // Build up a map of institution id -> count.
      .then(function(result) {

        var counts = {};
        _.each(result.rows, function(r) {

          if (_.has(counts, r.institution_id)) {
            counts[r.institution_id] += 1;
          } else {
            counts[r.institution_id] = 1;
          }

        });

        res.send(counts);
        close();

      });

    }

    // Load counts for all texts.
    else {

      // Try to hit the cache.
      var cached = cache.get('all-counts');
      if (cached) res.send(cached);

      else {

        client.queryAsync(
          "SELECT "+
          "DISTINCT(institution_id) as id, "+
          "COUNT(institution_id) as count "+
          "FROM document_institution "+
          "GROUP BY institution_id"
        )

        .then(function(result) {

          // Build the counts.
          var ids = _.pluck(result.rows, 'id');
          var cts = _.pluck(result.rows, 'count');
          var counts = _.zipObject(ids, cts);
          res.send(_.zipObject(ids, cts));

          // Cache the response.
          cache.put('all-counts', counts);

        });

      }

      close();

    }

  });

};
