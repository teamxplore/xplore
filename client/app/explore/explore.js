angular.module('uberxplore.explore', ['ngTouch', 'ngAnimate', 'uberxplore.geocoords'])

.controller('ExploreController', function($scope, $http, Locations, Coords) {

  // starts out with newSearch boolean set to true
  // flip to false after a choice is made
  $scope.newSearch = true;
  // start with loading state being false, flip to true while Yelp API call runs
  // flip back to false after yelp results are loaded
  $scope.isLoading = false;

  // scope variable for Locations
  $scope.Locations = Locations;
  
  $scope.exploreResults = [];

  $scope.search = function(searchType) {
    // set isLoading to true and newSearch to false
    $scope.newSearch = false;
    $scope.isLoading = true;
    // get geoLocation as a string and save coords into shared Coords factory
    var geoCoords;
    navigator.geolocation.getCurrentPosition(function(pos) {
      geoCoords = pos.coords.latitude + ',' + pos.coords.longitude;
      // this hardcodes our shared Coords as Rome, Italy
      Coords.lat = 41.902783;
      Coords.lng = 12.496366;
      // this is the real version
      // Coords.lat = pos.coords.latitude;
      // Coords.lng = pos.coords.longitude;
    });
    // see if it set our object correctly
    console.log(Coords);
    // make http POST request to server with geolocation
    $http.post('/search', {term: searchType, limit: 20, sort: 2, ll: '41.902783,12.496366'}) // our version with hardcoded coordinates for Rome, Italy
    // $http.post('/search', {term: searchType, limit: 20, sort: 2, ll: geoCoords})  This is the real version with actual geoCoords
      .success(function(data) {
        // $scope.isLoading = false;
        console.log('success', data);
        $scope.exploreResults = $scope.filterSaved(data);
      })
      .catch(function(err) {
        console.log('error',err);
      })
      .finally(function() {
        $scope.isLoading = false;
      });
  };

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

  // on clicking New Search, we reset newSearch and isLoading booleans
  $scope.reset = function() {
    $scope.newSearch = true;
    $scope.isLoading = false;
  };

  $scope.filterSaved = function(array) {
    var results = [];
    array.forEach(function(listing) {
      var unique = true;
      Locations.forEach(function(savedItem) {
        if (savedItem.name === listing.name) {
          unique = false;
        }
      });
      if (unique) { results.push(listing); }
    });

    return results;
  };

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