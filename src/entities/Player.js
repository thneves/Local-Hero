import Entity from './Entities';

export default class Player extends Entity {
  constructor(scene, x, y, key){
    super(scene, x, y, key, "Player");
    this.setData("speed", 200);
    this.play("sprPlayer");
  }
}