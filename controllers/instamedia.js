klimaChallenge.service('instaMedia', function($http) {

   // Read only token for instagram profile, generated with http://instafeedjs.com
   var instagramToken = '2148293488.7336d98.847543cf7196453d95288b71e9b28aef';
   var instagramResponse = '';
   var isError = true;

   $http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + instagramToken)
   .then(function(response) {
      instagramResponse = response;
      isError = false;
   }, function(error) {
      isError = true;
   });

   return {
      'lastPhotoUrl': function() {

         if (isError) {
            return 'https://scontent-fra3-1.xx.fbcdn.net/hphotos-xfp1/t31.0-8/1911031_10152909046213951_4560039218640562970_o.jpg';
         }
         return instagramResponse.data[0].images.standard_resolution.url;
      }
   };
});
