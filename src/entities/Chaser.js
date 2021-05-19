import Entity from './Entities';

export default class Chaser extends Entity {
  constructor(scene, x, y) {
    super(scene,x, y, "sprEnemy1", "Chaser");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}