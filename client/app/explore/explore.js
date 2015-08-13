angular.module('uberxplore.explore', ['ngTouch', 'ngAnimate'])

.controller('ExploreController', function($scope, $http, Locations) {
  // start with loading state being true, flip after Yelp results load
  $scope.isLoading = true;
  
  $scope.exploreResults = [];
  // do a Yelp API call to set locations
  $http.get('/search')
    .success(function(data) {
      $scope.isLoading = false;
      // console.log('success:',data);
      $scope.exploreResults = data;
    })
    .catch(function(err) {
      console.log('error:',err);
    })
    .finally(function() {
      $scope.isLoading = false;
    });

  $scope.currentIndex = 0;


  // Show next on a swipe left
  $scope.nextEntry = function() {
    if ($scope.currentIndex < $scope.exploreResults.length - 1) {
      $scope.currentIndex++;
    } else {
      $scope.currentIndex = 0;
    }
  };

  // Show previous on a swipe right
  $scope.prevEntry = function() {
    if ($scope.currentIndex > 0) {
      $scope.currentIndex--;
    } else {
      $scope.currentIndex = $scope.exploreResults.length - 1;
    }
  };

  // $scope.removeFromView = function(index) {
  //   // if index is the last element in the array, display the previous item
  //   if (index === $scope.exploreResults.length -1) {
  //     $scope.currentIndex--;
  //   }
  //   $scope.exploreResults.splice(index, 1);
  // };

  $scope.addToItinerary = function(index) {
    // if index is the last element in the array, display the previous item
    if (index === $scope.exploreResults.length -1) {
      $scope.currentIndex--;
    }
    var item = $scope.exploreResults[index];
    if (Locations.indexOf(item)) {
      Locations.push(item);
    }
    $scope.exploreResults.splice(index, 1);
  };

  // converts meters from Yelp data to miles with 1 decimal place
  $scope.convertDistance = function(meters) {
    return Math.round(meters / 160) / 10;
  };

  $scope.isCurrentSlideIndex = function(index) {
    return index === $scope.currentIndex;
  };
});