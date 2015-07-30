klimaChallenge.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('challenge', {
      url: "/",
      templateUrl: "views/challenge.html",
      controller: 'ChallengeCtrl'
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
.controller('tabCtrl', function($scope, $location, $log) {

   $scope.$watch('selectedIndex', function(current, old) {

      switch (current) {
         case 0:
            $location.url("/");
            break;
         case 1:
            $location.url("/news");
            break;
         case 2:
            $location.url("/ideen");
            break;
      }
   });
});
