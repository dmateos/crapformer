Game = function() {
  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(1680, 1280);
  this.player = undefined;
  var tiles = [];
  var enemies = [];
  var bump = new Bump(PIXI);

  renderer.backgroundColor = 0x0099cc;
  document.body.appendChild(renderer.view);

  stage.interactive = true;
  stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);

  stage.mousedown = function(mouseData) {
    var tile = new GameObject(mouseData.data.global.x - stage.x, mouseData.data.global.y - stage.y, "grassMid.png");
    stage.addChild(tile.getSprite());
    tiles.push(tile);
  };

  function animate() {
    requestAnimationFrame(animate);

    var sprite = this.player.getSprite();
    var tile_sprites = tiles.map(function(obj) { return obj.getSprite(); });
    var hit = false;

    bump.hit(sprite, tile_sprites, false, false, false, function(collision, tile) {
      hit = collision;
      console.log(collision);

      if(collision == "bottom") {
        sprite.vy = 0;
        sprite.y = tile.y - sprite.height+10;
      }
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
        var enemy = new Actor("Floppit000", 9, 700+(i*900), 300);
        enemy.getSprite().play();
        stage.addChild(enemy.getSprite());
        enemies.push(enemy);
      }
  });
}
