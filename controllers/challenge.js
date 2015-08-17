klimaChallenge.controller('ChallengeCtrl', function($scope, $http, $timeout) {

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
      var numberProjects = 25;
      for (var i = 0; i < numberProjects; i++) {
         var radius = Math.sqrt(renderer.width*20/numberProjects)+21;
         radius = radius * (Math.random() * 1.3 + 0.7);
         var project = Physics.body('circle', {
           x: renderer.width * 0.5,
           y: -i*1000,
           vx: 0.3,
           radius: radius,
           styles: {
               fillStyle: '#8bc34a'
           }
         });
         world.add(project);
      }

       // add things to the world
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
});
