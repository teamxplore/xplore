var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var yelp = require('./yelp/yelpHandler.js');
var utils = require('./yelp/utils.js');
var uber = require('./uber/uberHandler.js');

var app = express();

app.use(cors()); // allow CORS
app.use(bodyParser.json()); // parse json into req.body
app.use(express.static(__dirname + "/../client"));

var searchParams = {
  term: 'landmarks',
  sort: 2,
  limit: 5,
  location: 'Paris, France'
};

// app.get('/url', function(req, res) {
//   var url = 'http://s3-media4.fl.yelpcdn.com/bphoto/8ZcN-JDxU6ixJFsR1UjC6w/ms.jpg';
//   var data = utils.getLargeImg(url);
//   res.send(data);
// });

// var businessParams = "musée-d-orsay-paris-3";

app.get('/search', function(req, res) {
  yelp.explore(searchParams, function(data) {
    var results = [];
    data.businesses.forEach(function(listing) {
      results.push(utils.makeExploreEntry(listing));
    });
    res.send(results);
  });
});

// app.get('/business', function(req, res) {
//   yelp.business(businessParams, function(error, data) {
//     console.log(error);
//     res.send(data);
//   });
// });

// yelp.search({term: "ramen", location: "Sacramento, CA"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });


var uberRouter = express.Router();
uberRouter.get('/auth', uber.auth);
uberRouter.get('/auth/callback', uber.authCallback);
uberRouter.get('/isauth', uber.isAuth, uber.ok);
uberRouter.get('/products', uber.getProducts);
uberRouter.get('/price', uber.getPriceEstimates);
uberRouter.get('/time', uber.getTimeEstimates);

// check for OAuth for all routes to requests
uberRouter.use('/requests', uber.isAuth);
uberRouter.post('/requests/estimate', uber.getRideEstimate);
uberRouter.post('/requests', uber.requestRide);
uberRouter.delete('/requests/', uber.cancelRide);
uberRouter.get('/requests/details', uber.getRideDetails);
uberRouter.get('/requests/map', uber.getRideMap);
uberRouter.get('/requests/receipt', uber.getRideReceipt);
app.use('/uber', uberRouter);

var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log('Listening to port '+port);
});
