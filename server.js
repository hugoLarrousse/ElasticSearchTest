const express = require('express');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// client.ping({
//   requestTimeout: 3000,
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// client.search({
//   q: 'pants'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   console.trace(error.message);
// });

// client.indices.delete({
//   index: 'test_index',
//   ignore: [404]
// }).then(function (body) {
//   // since we told the client to ignore 404 errors, the
//   // promise is resolved even if the index does not exist
//   console.log('index was deleted or never existed');
// }, function (error) {
//   // oh no!
// });




// client.search({
//   index: 'twitter',
//   type: 'tweets',
//   body: {
//     query: {
//       match: {
//         body: 'elasticsearch'
//       }
//     }
//   }
// }).then(function (resp) {
//     var hits = resp.hits.hits;
// }, function (err) {
//     console.trace(err.message);
// });

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
