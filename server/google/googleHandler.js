var request = require('request');
var url = require('url');

var google = {};

google.geocode_url = 'https://maps.googleapis.com/maps/api/geocode/json';
google.api_key = 'AIzaSyA8m1HUl86kgHLfYTggYYRIEMhnPZF36-8';

google.geocode = function(req, res, next) {
  console.log('google geocode server');
  var parts = url.parse(req.url);
  request.get({
    url: google.geocode_url+'?'+parts.query+'&key='+google.api_key,
    json: true
  }, function(err, data, results) {
    if( err ) throw(err);
    res.send(results);
  });
};

module.exports = google;
