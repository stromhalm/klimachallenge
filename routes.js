klimaChallenge.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('challenge', {
      url: "/",
      templateUrl: "views/challenge.html",
      controller: "challengeCtrl"
  })
  .state('contract', {
      url: "/contract",
      templateUrl: "views/contract.html"
  })
  .state('stats', {
      url: "/statistik",
      templateUrl: "views/stats.html"
  })
  .state('participate', {
      url: "/mitmachen",
      templateUrl: "views/participate.html"
  });
})
.controller('PageCtrl', function($scope, $location, $timeout) {

   $scope.$watch('selectedPage', function(current, old) {

      switch (current) {
         case 0:
            $location.url("/");
            break;
         case 1:
            $location.url("/contract");
            break;
         case 2:
            $location.url("/statistik");
            break;
         case 3:
            $location.url("/mitmachen");
            break;
      }

      $timeout(function() {
         window.dispatchEvent(new Event('resize'));
      }, 700);
   });
});
