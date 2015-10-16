klimaChallenge.controller('projectFormCtrl', function($scope, $mdDialog) {

   $scope.page = 1;
   $scope.formal = {};
   $scope.media = {};
   $scope.effort = {};


   $scope.nextPage = function() {
      $scope.page++;
   }

   $scope.previousPage = function() {
      $scope.page--;
   }


   $scope.hide = function() {
      $mdDialog.hide();
   };
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
   $scope.answer = function(answer) {
      $mdDialog.hide(answer);
   };
   $scope.submitForm = function() {
      $scope.cancel();
   }
});
