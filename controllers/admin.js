klimaChallenge.controller('adminCtrl', function($scope, Auth, projects) {

   $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

   /*

   projects.$add({
      formal: $scope.formal,
      potential: $scope.potential,
      media: $scope.media,
      effort: $scope.effort,
      custom: $scope.custom,
      climatePoints: $scope.getClimatePoints()
   })

   */
});
