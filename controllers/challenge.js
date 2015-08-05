klimaChallenge.controller('ChallengeCtrl', function($scope, $http) {

   $http.get('https://graph.facebook.com/v2.4/natgeo/photos/uploaded?fields=link,height,name,images,picture&limit=20&access_token=846767055411205|UKF39DbxTvvEeA9BuKkWsJgiuLE').
   success(function(data, status, headers, config) {

      $scope.facebookImages = Array();
      angular.forEach(data.data, function(image, key) {
         if(image.height >= 500) {
            $scope.facebookImages.push(image)
         }
      });
      $scope.jumbotron = $scope.facebookImages[0];
   })

   // Matter.js module aliases
   var Engine = Matter.Engine,
       World = Matter.World,
       Bodies = Matter.Bodies;

   var canvasWidth = document.getElementById('physics-world').offsetWidth;
   var canvasHeight = document.getElementById('physics-world').offsetHeight;

   // create a Matter.js engine
   var engine = Engine.create({
      render: {
         element: document.getElementById('physics-world'),
         options: {
            wireframes: false,
            width: canvasWidth,
            height: canvasHeight,
            background: 'white'
         }
      }
   });

   engine.world.bounds.min.x = -Infinity;
   engine.world.bounds.min.y = -Infinity;
   engine.world.bounds.max.x = Infinity;
   engine.world.bounds.max.y = Infinity;

   // add a mouse controlled constraint
   mouseConstraint = Matter.MouseConstraint.create(engine);
   World.add(engine.world, mouseConstraint);

   // Create balls
   var bodies = Array();
   for (var i = 0; i < 11; i++) {
      bodies.push(Bodies.circle(canvasWidth/2, 0, canvasWidth/15, {render: {
            fillStyle: 'rgb(68, 138, 255)',
            strokeStyle: 'rgb(68, 138, 255)'
       }}));
   }

   bodies.push(Bodies.rectangle(canvasWidth/2, canvasHeight+1, 2000, 1, { isStatic: true })); // bottom
   bodies.push(Bodies.rectangle(-1, canvasHeight/2, 1, 2000, { isStatic: true })); // left

   var right = Bodies.rectangle(canvasWidth+1, canvasHeight/2, 1, 2000, { isStatic: true })
   Matter.Body.rotate(right, Math.PI );
   bodies.push(right); // right
   bodies.push(Bodies.rectangle(canvasWidth/2, -200, 2000, 1, { isStatic: true })); // top

   // add all of the bodies to the world
   World.add(engine.world, bodies);

   // run the engine
   Engine.run(engine);
});
