var express = require('express');
var fs = require('fs');
var path = require('path');
var yelp = require('./yelpRequest');
var app = express();

app.use(express.static(__dirname + "/../public"));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});

var searchParams = {
  term: 'landmarks',
  sort: 2,
  limit: 5,
  location: 'Paris, France'
};

var businessParams = "musée-d-orsay-paris-3";

app.get('/search', function(req, res) {
  yelp.explore(searchParams, function(data) {
    res.send(data);
  });
});

app.get('/business', function(req, res) {
  yelp.business(businessParams, function(error, data) {
    console.log(error);
    res.send(data);
  });
});

// yelp.search({term: "ramen", location: "Sacramento, CA"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });