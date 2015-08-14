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
.controller('ItineraryMapController', function($scope, $modal, Locations, uiGmapGoogleMapApi, Google, Coords) {

  $scope.showMap = false;
  $scope.locations = Locations;
  $scope.markers = [];
  $scope.map = {
    center: {
      latitude: Coords.lat,
      longitude: Coords.lng
    },
    zoom: 8
  };

  uiGmapGoogleMapApi.then(function(maps) {
    userMarkerSetup();
    locationMarkersSetup();
  });

  $scope.markerClick = function(gMarker, event, marker) {
    var location = $scope.locations[marker.id - 1]; // user is index 0
    console.log('clicked '+location.name);
    openUberModal(location);
    // TODO: need to update this to show modal uber ride view
  };

  var openUberModal = function(location) {
    var uberModal = $modal.open({
      templateUrl: 'app/itinerary/uber-modal/uber-modal.html',
      controller: 'UberModal',
      resolve: {
        // Passes the selected location to the modal
        // (selected is an index)
        location: function() {
          return location;
        }
      },
      windowClass: 'uber-modal'
    });

    uberModal.result.then(function(data) {
      console.log('closed');
      $scope.main.request_id = data.request_id;
      $scope.main.eta = data.eta;
    }, function() {
      console.log('dismissed');
    });
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
        latitude: Coords.lat,
        longitude: Coords.lng
      }
    };
    $scope.markers.push(userMarker);
  };

  var locationMarkersSetup = function() {
    var count = $scope.locations.length; // number of locations to load
    $scope.showMap = !count;

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
        labelAnchor:'0 72',
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
        $scope.showMap = !--count; // set to true if count is 0
      }.bind(null, marker));
    });
  };
});
