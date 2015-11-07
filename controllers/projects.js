klimaChallenge.factory("projects", function($firebaseArray) {

   // create a reference to the database location where we will store our data
   var ref = new Firebase("https://klima-challenge.firebaseio.com/projects");

   // this uses AngularFire to create the synchronized array
   return $firebaseArray(ref);
});
