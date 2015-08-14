angular.module('uberxplore.uber', [])
.factory('Uber', function($http) {

  // var signin = function() {
  //   return $http.get('/uber/auth');
  // };

  var isAuth = function() {
    return $http.get('/uber/isauth');
  };

  var getProducts = function(latitude, longitude) {
    var params = {
      // --- uncomment these when ready
      latitude: latitude,
      longitude: longitude
      // Rome coords
      // latitude: 41.902783,
      // longitude: 12.496366,
    };

    return $http.get('/uber/products', {params: params}).then(function(response) {
      return response.data;
    });
  };

  var getPriceEstimates = function(startLatitude, startLongitude, endLatitude, endLongitude) {
    var params = {
      // --- uncomment these when ready
      start_latitude: startLatitude,
      start_longitude: startLongitude,
      // Rome coords
      // start_latitude: 41.902783,
      // start_longitude: 12.496366,
      end_latitude: endLatitude,
      end_longitude: endLongitude
    };

    return $http.get('/uber/price', {params: params});
  };

  var getTimeEstimates = function(startLatitude, startLongitude, endLatitude, endLongitude) {
    var params = {
      // --- uncomment these when ready
      start_latitude: startLatitude,
      start_longitude: startLongitude,
      // Rome coords
      // start_latitude: 41.902783,
      // start_longitude: 12.496366,
      end_latitude: endLatitude,
      end_longitude: endLongitude
    };
    return $http.get('/uber/time', {params: params});
  };

  var getRideEstimate = function(productId, startLatitude, startLongitude, endLatitude, endLongitude) {
    var params = {
      // --- uncomment these when ready
      product_id: productId,
      start_latitude: startLatitude,
      start_longitude: startLongitude,
      //product_id: 'c9b74e41-816c-4df8-8290-41fc1df9476c', // need to get this from getProducts
      // Rome coords
      // start_latitude: 41.902783,
      // start_longitude: 12.496366,
      end_latitude: endLatitude,
      end_longitude: endLongitude
    };
    return $http.post('/uber/requests/estimate', {params: params}).then(function(response) {
      return response.data;
    });
  };

  var requestRide = function(productId, startLatitude, startLongitude, endLatitude, endLongitude) {
    var params = {
      // --- uncomment these when ready
      product_id: productId,
      start_latitude: startLatitude,
      start_longitude: startLongitude,
      //product_id: 'c9b74e41-816c-4df8-8290-41fc1df9476c', // need to get this from getProducts
      // Rome coords
      // start_latitude: 41.902783,
      // start_longitude: 12.496366,
      end_latitude: endLatitude,
      end_longitude: endLongitude
    };
    return $http.post('/uber/requests', {params: params}).then(function(response) {
      return response.data;
    });
  };

  var cancelRide = function(requestId) {
    var params = {
      request_id: requestId
    };
    return $http.delete('/uber/requests/', {params: params}).then(function(response) {
      return response.data;
    });
  };

  var getRideDetails = function(requestId) {
    var params = {
      request_id: requestId
    };
    return $http.get('/uber/requests/details', {params: params}).then(function(response) {
      return response.data;
    });
  };

  var getRideMap = function(requestId) {
    var params = {
      request_id: requestId
    };
    return $http.get('/uber/requests/map', {params: params}).then(function(response) {
      return response.data;
    });
  };

  var getRideReceipt = function(requestId) {
    var params = {
      request_id: requestId
    };
    return $http.get('/uber/requests/receipt', {params: params}).then(function(response) {
      return response.data;
    });
  };

  return {
    // signin: signin,
    isAuth: isAuth,
    getProducts: getProducts,
    getPriceEstimates: getPriceEstimates,
    getTimeEstimates: getTimeEstimates,
    getRideEstimate: getRideEstimate,
    requestRide: requestRide,
    cancelRide: cancelRide,
    getRideDetails: getRideDetails,
    getRideMap: getRideMap,
    getRideReceipt: getRideReceipt
  };
});
