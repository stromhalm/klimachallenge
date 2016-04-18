klimaChallenge.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('challenge', {
      url: "/",
      templateUrl: "views/challenge.html?ver=6",
      controller: "challengeCtrl"
  })
  .state('contract', {
      url: "/contract",
      templateUrl: "views/contract.html"
  })
  .state('climateChange', {
      url: "/klimawandel",
      templateUrl: "views/climate-change.html?ver=2"
  })
  .state('stats', {
      url: "/statistik",
      templateUrl: "views/stats.html?ver=2"
  })
  .state('participate', {
      url: "/mitmachen",
      templateUrl: "views/participate.html",
      controller: "projectFormCtrl"
  })
  .state('offers', {
      url: "/angebote",
      templateUrl: "views/offers.html"
  })
  .state('impressum', {
      url: "/impressum",
      templateUrl: "views/impressum.html"
  })
  .state('contact', {
      url: "/kontakt",
      templateUrl: "views/contact.html"
  })
  .state('admin', {
      url: "/admin",
      templateUrl: "views/admin.html",
      controller: "adminCtrl"
  })
  .state('klimafasten', {
      url: "/klimafasten",
      templateUrl: "views/klimafasten.html?ver=3"
  })
  .state('aktionstage', {
      url: "/aktionstage",
      templateUrl: "views/aktionstage.html?ver=3"
  });
})
.controller('PageCtrl', function($scope, $location, $timeout, $cacheFactory, $templateCache, $rootScope, $http) {

   /*
   var versionCache = $cacheFactory('versionCache');

   // Clear Cache if new version
   $rootScope.$on('$viewContentLoaded', function() {
      var lastCommit;
      $http.get("https://api.github.com/repos/stromhalm/klimachallenge/commits?per_page=1").then(function(response) {
         lastCommit = response.data[0];

         if (lastCommit.sha != versionCache.get('version')) {
            $templateCache.removeAll();
            versionCache.put('version', lastCommit.sha);
         }
      });
   });
   */

   $scope.$on('$locationChangeStart', function(event, next, current) {

      window.scrollTo(0, 0);
      $rootScope.showHeader = false;

      var nextPage = next.split('/');
      nextPage = nextPage[nextPage.length-1];

      switch (nextPage) {
         case '':
            $scope.selectedPage = 0;
            break;
         case 'klimawandel':
            $scope.selectedPage = 1;
            break;
         case 'angebote':
            $scope.selectedPage = 2;
            break;
         case 'mitmachen':
            $scope.selectedPage = 3;
            break;
         case 'statistik':
            $scope.selectedPage = 4;
            break;
         default: // Unsichtbarer "Sonstiges"-Tab
            $scope.selectedPage = 5;
            break;
      }
   });

   $scope.$watch('selectedPage', function(current, old) {

      switch (current) {
         case 0:
            $location.url("/");
            break;
         case 1:
            $location.url("/klimawandel");
            break;
         case 2:
            $location.url("/angebote");
            break;
         case 3:
            $location.url("/mitmachen");
            break;
         case 4:
            $location.url("/statistik");
            break;
      }
   });
});
