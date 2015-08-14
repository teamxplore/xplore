angular.module('uberxplore.uber-modal', [])

.controller('UberModal', function($scope, $modalInstance, location, Uber, Google, Coords) {
  // Location is being passed into the modal through $modal.resolve
  $scope.location = location;
  $scope.request = {}; // store request details when ride is requested
  $scope.state = 'select';

  // Get lat/lon coords
  Google.geocode($scope.location.address)
    .then(function(res) {
      console.log('google res = ', res);
      $scope.location.lat = res.lat;
      $scope.location.lng = res.lng;
      // Get available Uber products in the area
      Uber.getProducts(Coords.lat, Coords.lng).then(function(data) {
        $scope.products = data;
        $scope.products.forEach(function(product) {
          // Get estimates for the product
          Uber.getRideEstimate(product.product_id, Coords.lat, Coords.lng, $scope.location.lat, $scope.location.lng)
          .then(function(data) {
            console.log(data);
            // Add the important details to the specific product in $scope
            product.pickup_estimate = data.pickup_estimate ? data.pickup_estimate+' mins away' : null;
            product.low_estimate = data.price.low_estimate;
            product.high_estimate = data.price.high_estimate;
          });
        });
      });
    });

  $scope.requestUberRide = function(product) {
    Uber.requestRide(product.product_id, Coords.lat, Coords.lng, $scope.location.lat, $scope.location.lng)
    .then(function(data) {
      console.log(data);
      $scope.request_id = data.request_id;
      $scope.request.status = data.status;
      $scope.request.eta = data.eta ? data.eta+' mins' : null;
      $scope.state = 'confirmation';
    });
  };

  $scope.getRideDetails = function(requestId) {
    Uber.getRideDetails(requestId).then(function(data) {
      // do something with data
    });
  };

  $scope.close = function() {
    // Can pass data thru here if we want to handle the scheduled ride
    $modalInstance.close({
      request_id: $scope.request_id,
      eta: $scope.request.eta
    });
  };
});