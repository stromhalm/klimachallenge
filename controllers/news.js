klimaChallenge.controller('newsCtrl', function($scope, $http) {

   $scope.facebookImages = Array();

   $http.get('https://graph.facebook.com/v2.4/klimachallenge/photos/uploaded?fields=link,height,name,images&limit=4&access_token=846767055411205|UKF39DbxTvvEeA9BuKkWsJgiuLE').
   success(function(data, status, headers, config) {

      angular.forEach(data.data, function(image, key) {
            $scope.facebookImages.push(image)
      });
   })
});
