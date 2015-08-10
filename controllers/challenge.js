klimaChallenge.controller('ChallengeCtrl', function($scope, $http) {

   // Matter.js module aliases
   var Engine = Matter.Engine,
       World = Matter.World,
       Bodies = Matter.Bodies;
       Body = Matter.Body;

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
            background: 'transparent'
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
   var numberProjects = 30;
   for (var i = 0; i < numberProjects; i++) {
      var radius = Math.sqrt(canvasWidth*canvasHeight/20/numberProjects)+15;
      var project = Bodies.circle(canvasWidth/2, 0-radius*i, radius, {
         render: {
            fillStyle: '#59c134',
            strokeStyle: '#59c134'
         },
         restitution: 0.5
      });
      Body.applyForce(project, project.position, {x: (Math.random()-0.5)*0.1, y: (Math.random()-0.5)*0.5});
      bodies.push(project);
   }

   bodies.push(Bodies.rectangle(canvasWidth/2, canvasHeight+1, 99999, 1, { isStatic: true })); // bottom
   bodies.push(Bodies.rectangle(-1, canvasHeight/2, 1, 2000, { isStatic: true })); // left
   var right = Bodies.rectangle(canvasWidth+1, canvasHeight/2, 1, 99999, { isStatic: true });
   Body.rotate(right, Math.PI);
   bodies.push(right); // right

   // add all of the bodies to the world
   World.add(engine.world, bodies);

   // run the engine
   Engine.run(engine);
});
