klimaChallenge.controller('PhysicsCtrl', function($scope, $timeout, $interval) {

   var numberProjects = 15;
   var ballRadius = Math.pow(window.innerWidth, 1/2) * Math.pow(1/numberProjects, 1/10) + 30;

   Physics(function (world) {

      // create a renderer
      renderer = Physics.renderer('canvas', {
          el: 'physics-spring', // The DOM element to append the stage to
          meta: false // Turns debug info on/off
      });

      // add the renderer
      world.add(renderer);
      // render on each step
      world.on('step', function () {
         world.render();
      });

      // world bounds to the window
      var viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height), edgeBounce, renderer, newWidth, newHeight, oldWidth, oldHeight;

      // constrain objects to these bounds
      edgeBounce = Physics.behavior('edge-collision-detection', {
         aabb: viewportBounds,
         restitution: 0.4
      });

      var updateCanvas = function() {
         viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
         edgeBounce.setAABB(viewportBounds);
         var bodies = world.getBodies();
         angular.forEach(bodies, function(body) {
            body.sleep(false);
         });
      }

      // resize canvas on window resize
      window.addEventListener('resize', function () {
         updateCanvas();
      }, true);

      // Somtimes the canvas height isn't right, so refresh every 3s
      $interval(function() {

         newWidth = renderer.width;
         newHeight = renderer.height;

         if (newWidth != oldWidth || newHeight != oldHeight) {
            // Event needs to be triggered outside of $digest
            $timeout(function() {
               window.dispatchEvent(new Event('resize'));
            }, 0, false);
            oldHeight = newHeight;
            oldWidth = newWidth;
         }
      }, 3000);

       // create some bodies
      for (var i = 0; i < numberProjects; i++) {
         var thisRadius = ballRadius * (Math.random() * 1.05 + 0.95);

         var icon = Physics.body('rectangle', {
            x: 0,
            y: 0,
            width: thisRadius*2-30,
            height: thisRadius*2-30
         });
         icon.view = new Image();
         icon.view.src = 'img/icons/bike.png';

         var project = Physics.body('circle', {
            x: renderer.width * 0.5,
            y: -i*1000,
            vx: 0.3,
            radius: thisRadius,
            styles: {
               fillStyle: '#8bc34a'
            }
         });

         /*
         project.view = new Image();
         project.view.src = 'img/icons/ball.png';
         project.view.width = thisRadius*2;
         project.view.height = thisRadius*2;
         */

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

      // Tick all bodies on page change to awake them
      $scope.$on('$locationChangeSuccess', function(event) {
         updateCanvas();
      });

      // subscribe to ticker to advance the simulation
      Physics.util.ticker.on(function(time) {
         //world.step( time );
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
