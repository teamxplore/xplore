var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var yelp = require('./yelp/yelpHandler.js');
var utils = require('./yelp/utils.js');
var uber = require('./uber/uberHandler.js');
var google = require('./google/googleHandler.js');

var app = express();

app.use(cors()); // allow CORS
app.use(bodyParser.json()); // parse json into req.body
app.use(express.static(__dirname + "/../client"));

// var searchParams = {
//   term: 'landmarks',
//   sort: 2,
//   limit: 20,
//   location: 'Paris, France'
//   ll: '48.858370,2.294481'
//   location: 'London, England'
//   ll: '51.507351,-0.127758'
//   location: 'Rome, Italy'
//   ll: '41.902783,12.496366'
// };

var landmarksArray = [];
var shoppingArray = [];
var restaurantsArray = [];
var barsArray = [];

// app.get('/search', function(req, res) {
//   yelp.explore(searchParams, function(data) {
//     var results = [];
//     data.businesses.forEach(function(listing) {
//       results.push(utils.makeExploreEntry(listing));
//     });
//     res.send(results);
//   });
// });

app.post('/search', function(req, res) {
  var term = req.body.term;
  if (term === 'landmarks') {
    if (!!landmarksArray.length) { // if results have been populated, send back the landmarksArray
      res.send(landmarksArray);
    } else { // if landmarksArray is empty, do the Yelp request and populate the landmarksArray
      yelp.explore(req.body, function(data) {
        data.businesses.forEach(function(listing) {
          landmarksArray.push(utils.makeExploreEntry(listing));
        });
        res.send(landmarksArray);
      });
    }
  } else if (term === 'restaurants') {
    if (!!restaurantsArray.length) { // if results have been populated, send back the restaurantsArray
      res.send(restaurantsArray);
    } else { // if restaurantsArray is empty, do the Yelp request and populate the restaurantsArray
      yelp.explore(req.body, function(data) {
        data.businesses.forEach(function(listing) {
          restaurantsArray.push(utils.makeExploreEntry(listing));
        });
        res.send(restaurantsArray);
      });
    }
  } else if (term === 'shopping') {
    if (!!shoppingArray.length) { // if results have been populated, send back the shoppingArray
      res.send(shoppingArray);
    } else { // if shoppingArray is empty, do the Yelp request and populate the shoppingArray
      yelp.explore(req.body, function(data) {
        data.businesses.forEach(function(listing) {
          shoppingArray.push(utils.makeExploreEntry(listing));
        });
        res.send(shoppingArray);
      });
    }
  } else if (term === 'bars') {
    if (!!barsArray.length) { // if results have been populated, send back the barsArray
      res.send(barsArray);
    } else { // if barsArray is empty, do the Yelp request and populate the barsArray
      yelp.explore(req.body, function(data) {
        data.businesses.forEach(function(listing) {
          barsArray.push(utils.makeExploreEntry(listing));
        });
        res.send(barsArray);
      });
    }
  }
});

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


var googleRouter = express.Router();
googleRouter.get('/geocode', google.geocode);
app.use('/google', googleRouter);

var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log('Listening to port '+port);
});
