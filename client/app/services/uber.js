angular.module('uberxplore.services', [])
.factory('Uber', function($http) {
  var login = function() {

  };

  var getProducts = function(latitude, longitude) {
    var params = {
      // --- uncomment these when ready
      // latitude: latitude,
      // longitude: longitude
      latitude: 37.775818,
      longitude: -122.418028
    };

    return $http.get('/uber/products', {params: params});
  };

  var getPriceEstimates = function(startLatitude, startLongitude, endLatitude, endLongitude) {
    var params = {
      // --- uncomment these when ready
      // start_latitude: startLatitude,
      // start_longitude: startLongitude,
      // end_latitude: endLatitude,
      // end_longitude: endLongitude
      start_latitude: 37.334381,
      start_longitude: -121.89432,
      end_latitude: 37.77703,
      end_longitude: -122.419571,
    };

    return $http.get('/uber/price', {params: params});
  };

  var getTimeEstimates = function(startLatitude, startLongitude, endLatitude, endLongitude) {
    var params = {
      // --- uncomment these when ready
      // start_latitude: startLatitude,
      // start_longitude: startLongitude,
      // end_latitude: endLatitude,
      // end_longitude: endLongitude
      start_latitude: 37.334381,
      start_longitude: -121.89432,
      end_latitude: 37.77703,
      end_longitude: -122.419571,
    };
    return $http.get('/uber/time', {params: params});
  };

  return {
    login: login,
    getProducts: getProducts,
    getPriceEstimates: getPriceEstimates,
    getTimeEstimates: getTimeEstimates
  };
});