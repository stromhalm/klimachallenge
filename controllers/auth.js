klimaChallenge.factory("Auth", ["$firebaseAuth",
   function($firebaseAuth) {
      var ref = new Firebase("https://klima-challenge.firebaseio.com");
      return $firebaseAuth(ref);
   }
]);
