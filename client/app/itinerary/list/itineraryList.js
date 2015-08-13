angular.module('uberxplore.itineraryList', [])

.controller('ItineraryListController', function($scope, Locations) {
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
});