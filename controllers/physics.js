klimaChallenge.controller('PhysicsCtrl', function($scope, $timeout) {

   var numberProjects = 15;
   var ballRadius = Math.pow(window.innerWidth, 1/2) * Math.pow(1/numberProjects, 1/10) + 30;

   Physics(function (world) {
       // bounds of the window
       var viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight),
         edgeBounce,
         renderer;

       // create a renderer
       renderer = Physics.renderer('canvas', {
           el: 'physics-world'
       });

       // add the renderer
       world.add(renderer);
       // render on each step
       world.on('step', function () {
           world.render();
       });

       // constrain objects to these bounds
       edgeBounce = Physics.behavior('edge-collision-detection', {
           aabb: viewportBounds,
           restitution: 0.4
       });

       // resize canvas on canvas resize
       window.addEventListener('resize', function () {
           viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
           edgeBounce.setAABB(viewportBounds);
       }, true);

       // At init the canvas won't load the correct window height, so refresh aufter 0.5s
       $timeout(function() {
          window.dispatchEvent(new Event('resize'));
       }, 500);

       // create some bodies
      for (var i = 0; i < numberProjects; i++) {
         var thisRadius = ballRadius * (Math.random() * 1.05 + 0.95);
         var project = Physics.body('circle', {
           x: renderer.width * 0.5,
           y: -i*1000,
           vx: 0.3,
           radius: thisRadius,
           styles: {
               fillStyle: '#8bc34a'
           }
         });
         world.add(project);
      }

       // add behaviors to the world
       world.add([
          Physics.behavior('interactive', { el: renderer.container }),
          Physics.behavior('constant-acceleration', {acc: { x : 0, y: 0.0005 }}),
          Physics.behavior('body-impulse-response'),
          Physics.behavior('body-collision-detection'),
          Physics.behavior('sweep-prune'),
          edgeBounce
       ]);

       // subscribe to ticker to advance the simulation
       Physics.util.ticker.on(function( time ) {
           world.step( time );
       });
   });

   $scope.getBallAreaHeight = function() {
      var areaHeight = Math.pow(ballRadius*2, 2) * numberProjects/window.innerWidth * 2.1 + 220;

      // Ball area shall be at least 400px high
      if (areaHeight < 400)
         return 400;
      return areaHeight;
   }
});