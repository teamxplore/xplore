var request = require('request');
var url = require('url');
var querystring = require('querystring');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

// uber parameters
var uber = {};

uber.base_url = 'https://sandbox-api.uber.com/';
uber.authorize_url = 'https://login.uber.com/oauth/authorize';
uber.token_url = 'https://login.uber.com/oauth/token';
uber.client_id = 'sGV-9D8qBynnWoxef1Ypx2CdlHR7o1ur';
uber.client_secret = 'oZG5odTBYrTDDrhzrsS4VyjRmcNSMiEEVFITMVG5';
uber.server_token = 'hEzSroKbw1anftqjSSkP28vumXAGWjjVzeARqhk2';

/*
To manully revoke access token:

curl -F 'client_secret=oZG5odTBYrTDDrhzrsS4VyjRmcNSMiEEVFITMVG5' -F 'client_id=sGV-9D8qBynnWoxef1Ypx2CdlHR7o1ur' -F 'token=YOUR_ACCESS_TOKEN' https://login.uber.com/oauth/revoke
*/

var endpoints = {
  products: 'v1/products',
  priceEstimates: 'v1/estimates/price',
  timeEstimates: 'v1/estimates/time',
  requests: 'v1/requests',
  requestEstimate: 'v1/requests/estimate'
};

var headers = {
  Authorization: 'Bearer '+uber.accessToken,
  'Content-Type': 'application/json'
};

passport.use('uber', new OAuth2Strategy({
  authorizationURL: uber.authorize_url,
  tokenURL: uber.token_url,
  clientID: uber.client_id,
  clientSecret: uber.client_secret,
  callbackURL: 'http://localhost:1337/uber/auth/callback'
},
function(accessToken, refreshToken, profile, done) {
  uber.accessToken = accessToken;
  uber.refreshToken = refreshToken;
  headers.Authorization = 'Bearer '+accessToken;
  console.log(uber.accessToken);
  console.log('to revoke:');
  console.log('curl -F \'client_secret=oZG5odTBYrTDDrhzrsS4VyjRmcNSMiEEVFITMVG5\' -F \'client_id=sGV-9D8qBynnWoxef1Ypx2CdlHR7o1ur\' -F \'token='+accessToken+'\' https://login.uber.com/oauth/revoke');
  console.log('uber authenticated');
  done();
}));

uber.auth = passport.authenticate('uber', {scope: 'profile request'});

uber.authCallback = passport.authenticate('uber', {
  successRedirect: '/',
  failureRedirect: '/'
});

uber.isAuth = function(req, res, next) {
  if( !!uber.accessToken ) {
    next();
  } else {
    console.log('Not authenticated');
    res.status(401).send('Not authenticated');
  }
};

uber.ok = function(req, res, next) {
  res.status(200).send('OK');
};

uber.getProducts = function(req, res, next) {
  var parts = url.parse(req.url, true);

  var query = {
    server_token: uber.server_token,
    latitude: parts.query.latitude,
    longitude: parts.query.longitude
  };

  request.get({
    url: uber.base_url + endpoints.products + '?' + querystring.stringify(query),
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results.products); // responds with array of available products
  });
};

uber.getPriceEstimates = function(req, res, next) {
  var parts = url.parse(req.url, true);

  var query = {
    server_token: uber.server_token,
    start_latitude: parts.query.start_latitude,
    start_longitude: parts.query.start_longitude,
    end_latitude: parts.query.end_latitude,
    end_longitude: parts.query.end_longitude
  };

  request.get({
    url: uber.base_url + endpoints.priceEstimates + '?' + querystring.stringify(query),
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results.prices); // responds with array of price est for each available product
  });
};

uber.getTimeEstimates = function(req, res, next) {
  var parts = url.parse(req.url, true);

  var query = {
    server_token: uber.server_token,
    start_latitude: parts.query.start_latitude,
    start_longitude: parts.query.start_longitude,
    end_latitude: parts.query.end_latitude,
    end_longitude: parts.query.end_longitude
  };

  request.get({
    url: uber.base_url + endpoints.timeEstimates + '?' + querystring.stringify(query),
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results.times); // responds with array of time est for each available product
  });
};

// -------------------------
// OAuth required for below
// -------------------------

uber.requestRide = function(req, res, next) {
  request.post({
    url: uber.base_url + endpoints.requests,
    headers: headers,
    json: req.body.params
  }, function(err, data, results) {
    if( err ) throw(err);
    console.log(results);
    res.send(results);
  });
};

uber.getRideEstimate = function(req, res, next) {
  request.post({
    url: uber.base_url + endpoints.requestEstimate,
    headers: headers,
    json: req.body.params
  }, function(err, data, results) {
    if( err ) throw err;
    console.log(results);
    res.send(results);
  });
};

uber.getRideDetails = function(req, res, next) {
  var requestId = url.parse(req.url, true).query.request_id;
  request.get({
    url: uber.base_url + endpoints.requests + '/' + requestId,
    headers: headers,
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results);
  });
};

uber.cancelRide = function(req, res, next) {
  var requestId = url.parse(req.url, true).query.request_id;
  request.del({
    url: uber.base_url + endpoints.requests + '/' + requestId,
    headers: headers,
  }, function(err, data, results) {
    if( err ) throw err;
    res.send(results);
  });
};

uber.getRideMap = function(req, res, next) {
  var requestId = url.parse(req.url, true).query.request_id;
  request.get({
    url: uber.base_url + endpoints.requests + '/' + requestId + '/map',
    headers: headers,
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results);
  });
};

uber.getRideReceipt = function(req, res, next) {
  var requestId = url.parse(req.url, true).query.request_id;
  request.get({
    url: uber.base_url + endpoints.requests + '/' + requestId + '/receipt',
    headers: headers,
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results);
  });
};


module.exports = uber;
