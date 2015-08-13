angular.module('uberxplore.uber-modal', [])

.controller('UberModal', function($scope, $modalInstance, location, Uber, Google) {
  // Location is being passed into the modal through $modal.resolve
  $scope.location = location;

  // Get lat/lon coords
  Google.geocode($scope.location.address)
    .then(function(res) {
      console.log('google res = ', res)
      $scope.location.lat = res.lat;
      $scope.location.lng = res.lng;
      // Get available Uber products in the area
      Uber.getProducts().then(function(res) {
        $scope.products = res.data;
        $scope.products.forEach(function(product) {
          // For closure access
          var product = product;
          // Get estimates for the product
          Uber.getRideEstimate(product.product_id, null, null, $scope.location.lat, $scope.location.lng)
          .then(function(res) {
            console.log(res.data);
            // Add the important details to the specific product in $scope
            product.pickup_estimate = res.data.pickup_estimate;
            product.low_estimate = res.data.price.low_estimate;
            product.high_estimate = res.data.price.high_estimate;
          })
        })
      });
    });
  
  $scope.requestUberRide = function(product) {
    Uber.requestRide(product.product_id, null, null, $scope.location.lat, $scope.location.lng)
    .then(function(res) {
      console.log(res);
      $scope.close();
    })
  }

  $scope.close = function() {
    // Can pass data thru here if we want to handle the scheduled ride
    $modalInstance.close();
  }

});