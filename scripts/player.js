Player = function(resource_name, frames) {
  var spriteFrames = [];

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
  //sprite.play();

  this.getSprite = function() {
    return sprite;
  }
}
