const express = require('express');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// in a browser or postman
// ex: http://localhost:9200/myindex/mytype/_search (use kibana for more info)


const app = express();

const port = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', async (req, res) => {
  client.create({
    index: 'myindex2',
    type: 'mytype2',
    id: '1',
    body: {
      title: 'Test 1',
      tags: ['y', 'z'],
      published: true,
      published_at: '2013-01-01',
      counter: 1
    }
  }, function (error, response) {
    // ...
    res.status(200).json('OK');
  });
});

app.get('/', async (req, res) => {
  client.search({
    index: 'myindex',
    type: 'mytype',
    body: {
      query: {
        match: {
          title: 'Test'
        }
      }
    }
  }).then(function (resp) {
      var hits = resp.hits.hits;
      res.status(200).json(resp);
  }, function (err) {
      console.trace(err.message);
  });
});

app.listen(port, function (res) {
  console.log(`Server is running on port ${port}`);
});
