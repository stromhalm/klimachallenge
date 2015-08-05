klimaChallenge.controller('newsCtrl', function($scope, $http) {

   $scope.facebookImages = Array();

   $http.get('https://graph.facebook.com/v2.4/natgeo/photos/uploaded?fields=link,height,name,images,picture&limit=20&access_token=846767055411205|UKF39DbxTvvEeA9BuKkWsJgiuLE').
   success(function(data, status, headers, config) {

      angular.forEach(data.data, function(image, key) {
         if(image.height >= 500) {
            $scope.facebookImages.push(image)
         }
      });
   })
});
