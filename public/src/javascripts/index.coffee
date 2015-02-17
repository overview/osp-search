

# TODO|dev
es = require('elasticsearch')

client = new es.Client(
  host: 'localhost:9201'
)

client.ping {requestTimeout: 1000}, (err) ->
  console.log(err)

client.search({
  size: 100,
  query: {
    query_string: {
      query: '*'
    },
    sort: [
      {count: {order: 'desc'}},
      '_score'
    ]
  }
}).then (body) ->
  console.log(body.hits.hits)
