import Enemylaser from "./EnemyLaser";
import Entity from "./Entities";

export default class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy0", "GunShip");
      this.play("sprEnemy0");
      this.body.velocity.y = 75;

      this.shootTimer = this.scene.time.addEvent({
        delay: 1000,
        callback: function() {
          let laser = new Enemylaser(
            this.scene,
            this.x,
            this.y
          );
          laser.setScale(this.scaleX);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true
      });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}