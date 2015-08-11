angular.module('uberxplore.itineraryList', [])

.controller('ItineraryListController', function($scope, Locations) {
  // Setting the locations to the service will keep it in sync with
  // all other parts of the app
  $scope.locations = Locations;

  // Runs when itinerary item is clicked
  $scope.select = function() {
    // Slides out selection options such as Request Uber and Delete
  }

  $scope.remove = function() {

  }
});