angular.module('uberxplore', [
  'uberxplore.itineraryList',
  'uberxplore.locations',
  'uberxplore.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise();

  // Uncomment the states when implementing them
  $stateProvider
    .state('explore', {
      // url: '/explore',
      // templateUrl:'app/explore/explore.html',
      // controller: 'ExploreController'
    })
    .state('list', {
      url: '/list',
      templateUrl:'app/itinerary/list/itineraryList.html',
      controller: 'ItineraryListController'
    })
    .state('map', {
      // url: '/map',
      // templateUrl:'app/itinerary/list/itineraryMap.html',
      // controller: 'ItineraryMapController'
    })
}); 
