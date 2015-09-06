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
.controller('PageCtrl', function($scope, $location, $timeout, $templateCache) {

   $scope.$on('$locationChangeStart', function(event, next, current) {

      $templateCache.removeAll(); // Prevent caching

      var nextPage = next.split('/');
      nextPage = nextPage[nextPage.length-1];

      switch (nextPage) {
         case '':
            $scope.selectedPage = 0;
            break;
         case 'mitmachen':
            $scope.selectedPage = 1;
            break;
         case 'statistik':
            $scope.selectedPage = 2;
            break;
         case 'contract':
            $scope.selectedPage = 3;
            break;
      }
   });

   $scope.$watch('selectedPage', function(current, old) {

      switch (current) {
         case 0:
            $location.url("/");
            break;
         case 1:
            $location.url("/mitmachen");
            break;
         case 2:
            $location.url("/statistik");
            break;
         case 3:
            $location.url("/contract");
            break;
      }

      $timeout(function() {
         window.dispatchEvent(new Event('resize'));
      }, 500);
   });
});
