klimaChallenge.controller('aktionstage', function($scope, projects, filepickerService) {

   $scope.events = projects.events;
   $scope.carriers = projects.carriers;
   $scope.formData = {};

   $scope.setSubmitted = function (value) {
      $scope.submitted = value;
   };

   $scope.submitForm = function() {

      $scope.submitting = true;
      projects.aktionstage.$add($scope.formData)
      .then(function(p) {
         $scope.submitting = false;
         $scope.formData = {};
         $scope.form.$setUntouched();
         $scope.submitted = true;
      });
   };
});
