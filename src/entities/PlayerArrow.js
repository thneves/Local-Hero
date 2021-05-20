import Entity from "./Entities";

export default class PlayerArrows extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprPlayerArrow");
    this.body.velocity.y = -200;
  }
}