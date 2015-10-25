klimaChallenge.controller('challengeCtrl', function($scope, $mdDialog) {

   $scope.showProjectForm = function(ev) {
      $mdDialog.show({
         controller: 'projectFormCtrl',
         templateUrl: 'views/projectForm.html',
         parent: angular.element(document.body),
         targetEvent: ev
      })
      .then(function(answer) {
         $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
         $scope.status = 'You cancelled the dialog.';
      });
   }
});
