klimaChallenge.controller('challengeCtrl', function($scope, projects) {

   $scope.$watch(function() {return projects.climatePointsSum() }, function(sum) {
      $scope.climatePointsTotal = sum;
   });

   $scope.$watch(function() {return projects.publicProjectsCount() }, function(sum) {
      $scope.publicProjectsCount = sum;
   });

   $scope.goalPercentage = 0;

   $scope.$watch(function() {return projects.getPercentage() }, function(percentage) {
      $scope.goalPercentage = percentage;
   });
});
