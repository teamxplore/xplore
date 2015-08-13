angular.module('uberxplore.itineraryList', [])

.controller('ItineraryListController', function($scope, $modal, Locations) {
  // Setting the locations to the service will keep it in sync with
  // all other parts of the app
  $scope.locations = Locations;
  $scope.selected = null;

  // Runs when itinerary item is clicked
  $scope.select = function(index) {
    // Slides out selection options such as Request Uber and Delete
    $scope.selected = index;
  }

  $scope.remove = function() {

  }

  $scope.openUberModal = function() {
    var uberModal = $modal.open({
      templateUrl: 'app/itinerary/uber-modal/uber-modal.html',
      controller: 'UberModal',
      resolve: {
        // Passes the selected location to the modal
        // (selected is an index)
        location: function() {
          return $scope.locations[$scope.selected];
        }
      },
      windowClass: 'uber-modal'
    });

    uberModal.result.then(function() {
      console.log('closed');
    }, function() {
      console.log('dismissed');
    })
  };

  // converts meters from Yelp data to miles with 1 decimal place
  $scope.convertDistance = function(meters) {
    return Math.round(meters / 160) / 10;
  };
});