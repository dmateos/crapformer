GameObject = function(x, y, resource_name) {
  var sprite = new PIXI.Sprite.fromFrame(resource_name);
  sprite.x = x;
  sprite.y = y;
  sprite.anchor.set(0.5);

  this.getSprite = function() {
    return sprite;
  }
}
