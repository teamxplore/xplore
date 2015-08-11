angular.module('uberxplore.locations', [])

.factory('Locations', function() {
  var locations = [];

  // Test data
  locations.push({
    name: "Hack Reactor",
    address: "944 Market Street #8, San Francisco, CA 94102",
    // We could possibly use API + star rating to generate the correct stars for the service
    api: "Yelp",
    stars: 5
  });

  // Exporting this locations will make it consistent across all parts of the app
  return locations;
})