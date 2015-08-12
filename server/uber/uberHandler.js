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
  requests: 'v1/requests'
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
  console.log(uber.accessToken);
  console.log('uber authenticated');
  done();
}));

uber.auth = function(req, res, next) {
  return passport.authenticate('uber', {scope: 'profile request'})(req, res, next);
};

uber.authCallback = function(req, res, next) {
  return passport.authenticate('uber', {
    successRedirect: '/',
    failureRedirect: '/'
  })(req, res, next);
};

uber.isAuth = function(req, res, next) {
  console.log(uber.accessToken);
  if( !!uber.accessToken ) {
    res.status(200).send('Authenticated');
  } else {
    res.status(401).send('Not authenticated');
  }
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

uber.requestRide = function(req, res, next) {
  if( !uber.hasOwnProperty('accessToken') ) {
    console.log('no access token');
    res.send({
      error: 'Not authenticated'
    });
  }

  request.post({
    url: uber.base_url + endpoints.requests,
    headers: {
      'Authorization': 'Bearer '+uber.accessToken,
      'Content-Type': 'application/json'
    },
    json: req.body.params
  }, function(err, data, results) {
    if( err ) throw(err);
    console.log(results);
    res.send(results);
  });
};

module.exports = uber;
