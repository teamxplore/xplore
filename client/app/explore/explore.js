angular.module('uberxplore.explore', ['ngTouch'])

.controller('ExploreController', function($scope, Locations) {
  // Setting the locations to the service will keep it in sync with
  // all other parts of the app
  $scope.locations = Locations;

  var currentIndex = 0;

  console.log($scope.locations.length); // code will run on load of explore.html

  // Show next on a swipe right
  $scope.nextEntry = function() {
    if (currentIndex < $scope.locations.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  };

  // Show previous on a swipe left
  $scope.prevEntry = function() {
    if (currentIndex > 0) {
      currentIndex--;
    }
    else {
      currentIndex = $scope.locations.length - 1;
    }
  };

  $scope.isCurrentSlideIndex = function(index) {
    return index === currentIndex;
  };
});