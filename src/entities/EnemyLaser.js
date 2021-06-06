import Entity from './Entities';

export default class Enemylaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyLaser');
    this.body.velocity.y = 200;
  }
}