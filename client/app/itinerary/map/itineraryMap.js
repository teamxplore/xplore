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
  // Setting the locations to the service will keep it in sync with
  // all other parts of the app
  $scope.locations = Locations;
  $scope.markers = [];
  $scope.map = {
    center: {
      latitude: 48.8567,
      longitude: 2.3508
    },
    zoom: 8
  };

  uiGmapGoogleMapApi.then(function(maps) {
    markerSetup(maps);
  });

  $scope.markerClick = function(gMarker, event, marker) {
    var location = $scope.locations[marker.id];
    // TODO: need to update this to show modal uber ride view
  };

  var markerSetup = function(maps) {
    $scope.locations.forEach(function(location, index) {
      var marker = {};
      marker.id = index;
      marker.options = {
        icon: {
          url: '/assets/uber-pin.png',
          scaledSize: {
            width: 20,
            height: 48,
            widthUnit:'px',
            heightUnit:'px'
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
