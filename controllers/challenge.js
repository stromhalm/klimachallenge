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
            fillStyle: '#59c134'
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


/*
   // Matter.js module aliases
   var Engine = Matter.Engine,
       World = Matter.World,
       Bodies = Matter.Bodies,
       Body = Matter.Body,
       Mouse = Matter.Mouse;

   var canvasWidth = document.getElementById('physics-world').offsetWidth;
   var canvasHeight = document.getElementById('physics-world').offsetHeight-200;


   var mouse = Matter.Mouse.create(
     document.getElementById('physics-world').children[0],
     {
       enabledEvents: {
         mousewheel: false
       }
     }
   );

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
<<<<<<< Updated upstream
   var numberProjects = 30;
=======
   var numberProjects = 25;
>>>>>>> Stashed changes
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
   */
});
