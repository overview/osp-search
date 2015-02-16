

# TODO|dev
es = require('elasticsearch')

client = new es.Client(
  host: 'localhost:9200'
)

client.ping (err) ->
  console.log(err)
