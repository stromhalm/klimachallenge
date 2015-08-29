klimaChallenge.controller('challengeCtrl', function($scope, instaMedia) {
   $scope.newsImageUrl = instaMedia.lastPhotoUrl();
});
