Game = function() {
  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(1680, 1280);
  this.player = undefined;
  var tiles = [];
  var enemies = [];
  var bump = new Bump(PIXI);

  var world = Physics();

  renderer.backgroundColor = 0x0099cc;
  document.body.appendChild(renderer.view);

  function animate() {
    requestAnimationFrame(animate);

    var sprite = this.player.getSprite();
    var tile_sprites = tiles.map(function(obj) { return obj.getSprite(); });
    var hit = false;

    bump.hit(sprite, tile_sprites, false, false, false, function(collision, tile) {
      sprite.vy = 0;
      hit = collision;
      sprite.y = tile.y - sprite.height+10;
    });

    if(hit != "bottom") {
      sprite.vy += 0.5;
    }

    enemies.forEach(function(e) {
      e.act();
    });

    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    stage.x = -sprite.x/2;
    renderer.render(stage);
  }

  PIXI.loader
    .add("tiles", "assets/tiles.json")
    .add("player_one", "assets/p1_walk.json")
    .add("floppit", "assets/Floppit.json")
    .load(function(loader, resources) {
      player = new Player("Symbol 2 instance 1000", 10);
      stage.addChild(player.getSprite());
      requestAnimationFrame(animate);

      for(var i = 0; i < 16; i++) {
        var sprite = new GameObject(i*70, 900, "grassMid.png");
        stage.addChild(sprite.getSprite());
        tiles.push(sprite);
      }

      for(var i = 0; i < 5; i++) {
        enemy = new Actor("Floppit000", 9, 700+(i*900), 300);
        enemy.getSprite().play();
        stage.addChild(enemy.getSprite());
        enemies.push(enemy);
      }
  });

  right.press = function() {
    player.getSprite().vx += 3;
    player.getSprite().play();
    //player.getSprite().scale.x = 1
  }

  left.press = function() {
    player.getSprite().vx -= 3;
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
    player.getSprite().vy -= 10;
    player.getSprite().y -= 20;
  }

  // subscribe to the ticker
  Physics.util.ticker.on(function( time ){
      world.step( time );
  });
  // start the ticker
  Physics.util.ticker.start();

}
