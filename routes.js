klimaChallenge.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('challenge', {
      url: "/",
      templateUrl: "views/challenge.html"
  })
  .state('stats', {
      url: "/statistik",
      templateUrl: "views/stats.html"
  })
  .state('news', {
      url: "/news",
      templateUrl: "views/news.html"
  })
  .state('ideas', {
      url: "/ideen",
      templateUrl: "views/ideas.html"
  });
})
.controller('PageCtrl', function($scope, $location, $timeout) {

   $scope.$watch('selectedPage', function(current, old) {

      switch (current) {
         case 0:
            $location.url("/");
            break;
         case 1:
            $location.url("/statistik");
            break;
         case 2:
            $location.url("/news");
            break;
         case 3:
            $location.url("/ideen");
            break;
      }

      if (current == 0) {
         $scope.bigHeader = true;
      } else {
         $scope.bigHeader = false;
      }

      $timeout(function() {
         window.dispatchEvent(new Event('resize'));
      }, 500);
   });
});
