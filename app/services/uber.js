angular.module('uberxplore.services', [])
.factory('Uber', function($http) {
  var url = 'https://sandbox-api.uber.com/';
  var client_id = 'sGV-9D8qBynnWoxef1Ypx2CdlHR7o1ur';
  var server_token = 'kRsZskOJWvh2zRsLAQD33RxjJWoqGf65z3K0JI8z';

  var endpoints = {
    products: 'v1/products',
    priceEstimates: 'v1/estimates/price',
    timeEstimates: 'v1/estimates/time'
  };

  var login = function() {

  };

  var getProducts = function() {
    var params = {
      latitude: 37.775818, // TODO: fill in with user current location
      longitude: -122.418028 // TODO: fill in with user current location
    };
    return $http.get(url+endpoints.products, {
      headers: {
        Authorization: 'Token '+server_token
      },
      params: params
    });
  };

  var getPriceEstimates = function() {
    var params = {
      start_latitude: 37.334381, // TODO: fill in with user current location
      start_longitude: -121.89432, // TODO: fill in with user current location
      end_latitude: 37.77703, // TODO: fill in with user destination
      end_longitude: -122.419571, // TODO: fill in with user destination
    };
    return $http.get(url+endpoints.priceEstimates, {
      headers: {
        Authorization: 'Token '+server_token
      },
      params: params
    });
  };

  var getTimeEstimates = function() {
    var params = {
      start_latitude: 37.334381, // TODO: fill in with user current location
      start_longitude: -121.89432, // TODO: fill in with user current location
      end_latitude: 37.77703, // TODO: fill in with user destination
      end_longitude: -122.419571, // TODO: fill in with user destination
    };
    return $http.get(url+endpoints.timeEstimates, {
      headers: {
        Authorization: 'Token '+server_token
      },
      params: params
    });
  };

  return {
    login: login,
    getProducts: getProducts,
    getPriceEstimates: getPriceEstimates,
    getTimeEstimates: getTimeEstimates
  };
});