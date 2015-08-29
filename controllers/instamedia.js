klimaChallenge.service('instaMedia', function($http) {

   var instagramToken = '2148293488.7336d98.847543cf7196453d95288b71e9b28aef';

   this.getRecentPhotos = function() {
      return $http.jsonp('https://api.instagram.com/v1/users/2148293488/media/recent?access_token=' + instagramToken + '&callback=JSON_CALLBACK');
  }
});
