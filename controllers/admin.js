klimaChallenge.controller('adminCtrl', function($scope, Auth, projects) {

   $scope.auth = Auth;
   $scope.email = "";
   $scope.password = "";

   // any time auth status updates, add the user data to scope
   $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
   });

   $scope.login = function(email, password) {

      Auth.$authWithPassword({
         email: email,
         password: password
      }).then(function(authData) {

      }).catch(function(error) {
         $scope.loginError = true;
         console.error("Authentication failed:", error);
      });
   }
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
