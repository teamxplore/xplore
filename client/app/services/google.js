angular.module('uberxplore.google', [])
.factory('Google', function($http) {
  var geocode = function(address) {
    if( Array.isArray(address) ) {
      // if yelp address property passed in, join it into one string
      address = address.join(', ');
    }
    return $http.get('/google/geocode', {params: {address: address}}).then(function(response) {
      return response.data.results[0].geometry.location; // object with `lat` and `lng` properties
    }, function(err) {
      console.log(err);
    });
  };

  return {
    geocode: geocode
  };
});
