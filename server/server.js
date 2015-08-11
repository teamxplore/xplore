var express = require('express');
var fs = require('fs');
var path = require('path');
var yelp = require('./yelpRequest');
var utils = require('./utils');
var uber = require('./uber/uberHandler.js');

var app = express();

app.use(express.static(__dirname + "/../client"));

var port = process.env.PORT || 8000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening to port '+port);
});

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
uberRouter.get('/products', uber.getProducts);
uberRouter.get('/price', uber.getPriceEstimates);
uberRouter.get('/time', uber.getTimeEstimates);

app.use('/uber', uberRouter);

// exports
module.exports = app;
