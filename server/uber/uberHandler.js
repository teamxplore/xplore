var request = require('request');
var url = require('url');
var querystring = require('querystring');

// uber parameters
var uber_url = 'https://sandbox-api.uber.com/';
var client_id = 'sGV-9D8qBynnWoxef1Ypx2CdlHR7o1ur';
var client_secret = 'oZG5odTBYrTDDrhzrsS4VyjRmcNSMiEEVFITMVG5';
var server_token = 'kRsZskOJWvh2zRsLAQD33RxjJWoqGf65z3K0JI8z';

var endpoints = {
  products: 'v1/products',
  priceEstimates: 'v1/estimates/price',
  timeEstimates: 'v1/estimates/time'
};

var uber = {};

uber.getProducts = function(req, res, next) {
  var parts = url.parse(req.url, true);

  var query = {
    server_token: server_token,
    latitude: parts.query.latitude,
    longitude: parts.query.longitude
  };

  request.get({
    url: uber_url + endpoints.products + '?' + querystring.stringify(query),
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results.products); // responds with array of available products
  });
};

uber.getPriceEstimates = function(req, res, next) {
  var parts = url.parse(req.url, true);

  var query = {
    server_token: server_token,
    start_latitude: parts.query.start_latitude,
    start_longitude: parts.query.start_longitude,
    end_latitude: parts.query.end_latitude,
    end_longitude: parts.query.end_longitude
  };

  request.get({
    url: uber_url + endpoints.priceEstimates + '?' + querystring.stringify(query),
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results.prices); // responds with array of price est for each available product
  });
};

uber.getTimeEstimates = function(req, res, next) {
  var parts = url.parse(req.url, true);

  var query = {
    server_token: server_token,
    start_latitude: parts.query.start_latitude,
    start_longitude: parts.query.start_longitude,
    end_latitude: parts.query.end_latitude,
    end_longitude: parts.query.end_longitude
  };

  request.get({
    url: uber_url + endpoints.timeEstimates + '?' + querystring.stringify(query),
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results.times); // responds with array of time est for each available product
  });
};

module.exports = uber;
