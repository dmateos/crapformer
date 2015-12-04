Actor = function(resource_name, frames, x, y) {
  var spriteFrames = [];

  for(var i = 0; i < frames; i++) {
    spriteFrames.push(PIXI.Texture.fromFrame(resource_name + i));
  }

  var sprite = new PIXI.MovieClip(spriteFrames);
  sprite.vx = 0;
  sprite.vy = 0;
  sprite.x = x;
  sprite.y = y;
  sprite.anchor.set(0.5);
  sprite.animationSpeed = 0.5;
  sprite.interactive = true;

  this.getSprite = function() {
    return sprite;
  }

  var forward = true;
  var count = 0;
  this.act = function() {
    if(forward) {
      sprite.x -= 0.5
      count++;

      if(count >= 500) {
        forward = false;
        sprite.scale.x = -1;
      }
    } else {
      sprite.x += 0.5;
      count--;

      if(count <= 0) {
        forward = true;
        sprite.scale.x = 1;
      }
    }
  }
}
