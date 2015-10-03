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
  })
  .state('impressum', {
      url: "/impressum",
      templateUrl: "views/impressum.html"
  })
  .state('contact', {
      url: "/kontakt",
      templateUrl: "views/contact.html"
  });
})
.controller('PageCtrl', function($scope, $location, $timeout, $templateCache, $rootScope) {

   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });

   $scope.$on('$locationChangeStart', function(event, next, current) {

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
         default: // Unsichtbarer "Sonstiges"-Tab
            $scope.selectedPage = 4;
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
