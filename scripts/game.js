Game = function() {
  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(1680, 1280);
  var left = keyboard(65), up = keyboard(87), right = keyboard(68), down = keyboard(83);
  this.player = undefined;
  var world = Physics();
  var tiles = [];
  var bump = new Bump(PIXI);

  renderer.backgroundColor = 0x0099cc;
  document.body.appendChild(renderer.view);

  function animate() {
    requestAnimationFrame(animate);
    var sprite = this.player.getSprite();
    sprite.x += sprite.vx;

    floor = false;

    for(var i = 0; i < tiles.length; i++) {
      if(bump.hit(sprite, tiles[i].getSprite())) {
        floor = true;
        continue;
      }
    }


    if(!floor) {
      sprite.vy += 1;
    } else {
      sprite.vy = 0;
    }

    sprite.y += sprite.vy;
    renderer.render(stage);
  }

  PIXI.loader
    .add("tiles", "assets/tiles.json")
    .add("player_one", "assets/p1_walk.json")
    .load(function(loader, resources) {
      player = new Player("Symbol 2 instance 1000", 10);
      stage.addChild(player.getSprite());
      requestAnimationFrame(animate);

      for(var n = 0; n < 2; n++) {
      for(var i = 0; i < 32; i++) {
        alert(getRandomArbitrary(0,5));
        if(Math.floor(getRandomArbitrary(0, 5)) !== 3) {
          var sprite = new GameObject(i*70, 500-(n*300), "grassMid.png");
          stage.addChild(sprite.getSprite());
          tiles.push(sprite);
        }
      }
      }
  });

  right.press = function() {
    player.getSprite().vx += 1.5;
    player.getSprite().play();
    //player.getSprite().scale.x = 1
  }

  left.press = function() {
    player.getSprite().vx -= 1.5;
    player.getSprite().play();
    //player.getSprite().scale.x = -1
  }

  right.release = function() {
    player.getSprite().vx = 0;
    player.getSprite().stop();
  }

  left.release = function() {
    player.getSprite().vx = 0;
    player.getSprite().stop();
  }

  up.press = function() {
    player.getSprite().vy -= 20;
    player.getSprite().y -= 20;
  }

  // subscribe to the ticker
  Physics.util.ticker.on(function( time ){
      world.step( time );
  });
  // start the ticker
  Physics.util.ticker.start();

}
