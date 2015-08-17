klimaChallenge.controller('ChallengeCtrl', function($scope, $http) {

   Physics(function (world) {
    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight)
        ,edgeBounce
        ,renderer
        ;

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

    // initial resize (canvas expands to the bottom of the page)
    viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
    edgeBounce.setAABB(viewportBounds);

    // resize events
    window.addEventListener('resize', function () {

        // as of 0.7.0 the renderer will auto resize... so we just take the values from the renderer
        viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
        // update the boundaries
        edgeBounce.setAABB(viewportBounds);

    }, true);

    // create some bodies
   var numberProjects = 25;
   for (var i = 0; i < numberProjects; i++) {
      var radius = Math.sqrt(renderer.width*1000/20/numberProjects)+15;
      var project = Physics.body('circle', {
        x: renderer.width * 0.4,
        y: renderer.height * 0,
        vx: 0.3,
        radius: radius,
        styles: {
            fillStyle: '#8bc34a'
        }
      });
      world.add(project);
   }


    world.on({
        'interact:poke': function( pos ){
            world.wakeUpAll();
        }
        ,'interact:move': function( pos ){
        }
        ,'interact:release': function(){
            world.wakeUpAll();
        }
    });

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
