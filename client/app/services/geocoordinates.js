angular.module('uberxplore.geocoords', [])

.factory('Coords', function() {
  var latitude;
  var longitude;

  return {
    lat: latitude,
    lng: longitude
  };
});