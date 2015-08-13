angular.module('uberxplore.itineraryMap', [
  'uiGmapgoogle-maps'
])
.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyA8m1HUl86kgHLfYTggYYRIEMhnPZF36-8',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
})
.controller('ItineraryMapController', function($scope, Locations, uiGmapGoogleMapApi, Google) {

  $scope.locations = Locations;
  $scope.markers = [];
  $scope.map = {
    center: {
      // TODO: set this to user current location
      latitude: 41.9000,
      longitude: 12.5000
    },
    zoom: 8
  };

  uiGmapGoogleMapApi.then(function(maps) {
    userMarkerSetup();
    locationMarkersSetup();
    console.log($scope.markers);
  });

  $scope.markerClick = function(gMarker, event, marker) {
    var location = $scope.locations[marker.id - 1]; // user is index 0
    console.log('clicked '+location.name);
    // TODO: need to update this to show modal uber ride view
  };

  var userMarkerSetup = function() {
    var userMarker = {
      id: 0,
      options: {
        icon: {
          url: '/assets/user-pin.png',
          scaledSize: {
            width: 24,
            height: 24
          }
        }
      },
      coords: {
        // TODO: need to use some factory with updated geolocation
        latitude: 41.9000,
        longitude: 12.5000
      }
    };
    $scope.markers.push(userMarker);
  };

  var locationMarkersSetup = function() {
    $scope.locations.forEach(function(location, index) {
      var marker = {};
      marker.id = index + 1; // user is index 0
      marker.options = {
        icon: {
          url: '/assets/location-pin.png',
          scaledSize: {
            width: 24,
            height: 56
          }
        },
        labelClass:'marker-labels',
        labelAnchor:'10 64',
        labelContent: location.name
      };
      // Probably should do this when a location is first added to the list by the user
      // So that these are already here?
      Google.geocode(location.address).then(function(marker, coords) {
        marker.coords = {
          latitude: coords.lat,
          longitude: coords.lng
        };
        $scope.markers.push(marker);
      }.bind(null, marker));
    });
  };
});
