

# TODO|dev
es = require('elasticsearch')

client = new es.Client(
  host: 'localhost:9200'
)

client.ping {requestTimeout: 1000}, (err) ->
  console.log(err)
