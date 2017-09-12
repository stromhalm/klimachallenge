klimaChallenge.controller('newsCtrl', function($scope, $http, $sce) {

   $scope.facebookImages = Array();

   $http.get('https://graph.facebook.com/v2.10/klimachallenge/photos/uploaded?fields=link,width,name,images&limit=10&access_token=846767055411205|UKF39DbxTvvEeA9BuKkWsJgiuLE').
   success(function(data, status, headers, config) {

      angular.forEach(data.data, function(image, key) {

         // Only take images when they are big enough
         if (image.width >= 720) {
            if (image.name) {

               // Shorten image text if longer than 160 chars
               if (image.name.length > 160) {
                  var newText = image.name.substring(0,140);
                  var i = 140;
                  while (image.name.charAt(i) != " ") {
                     newText = newText + image.name.charAt(i);
                     i++;
                  }
                  image.name = newText;
                  image.showReadMore = true;
               }
            }
            $scope.facebookImages.push(image);
         }
      });
   });
});
