Player = function(resource_name, frames) {
  var spriteFrames = [];
  var left = keyboard(65), up = keyboard(87), right = keyboard(68), down = keyboard(83);

  for(var i = 0; i < frames; i++) {
    spriteFrames.push(PIXI.Texture.fromFrame(resource_name + i));
  }

  var sprite = new PIXI.MovieClip(spriteFrames);
  sprite.vx = 0;
  sprite.vy = 0;
  sprite.position.set(100);
  sprite.anchor.set(0.5);
  sprite.animationSpeed = 0.5;
  sprite.interactive = true;

  this.getSprite = function() {
    return sprite;
  }

  right.press = function() {
    sprite.vx += 3;
    sprite.play();
  }

  left.press = function() {
    sprite.vx -= 3;
    sprite.play();
  }

  right.release = function() {
    sprite.vx = 0;
    sprite.stop();
  }

  left.release = function() {
    sprite.vx = 0;
    sprite.stop();
  }

  up.press = function() {
    sprite.vy -= 10;
    sprite.y -= 20;
  }
}
