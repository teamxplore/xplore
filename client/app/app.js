angular.module('uberxplore', [
  'uberxplore.itineraryList',
  'uberxplore.explore',
  'uberxplore.locations',
  'uberxplore.services',
  'ngTouch',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/explore');

  // Uncomment the states when implementing them
  $stateProvider
    .state('auth', {
      url: '/auth',
      templateUrl:'app/auth/auth.html',
    })
    .state('explore', {
      url: '/explore',
      templateUrl:'app/explore/explore.html',
      controller: 'ExploreController'
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
    });
})
.run(function ($rootScope, $window, $state, Uber) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if( toState.name !== 'auth') {
      Uber.isAuth().then(null, function(err) {
        event.preventDefault();
        $state.go('auth');
      });
    }
  });
});

