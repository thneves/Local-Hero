import Phaser from 'phaser';
import Chaser from '../entities/Chaser';
import GunShip from '../entities/GunShip';
import Player from '../entities/Player';
import ScrollingBackground from '../entities/ScrollingBackground';
import Submarine from '../entities/Submarine';
import { saveScore } from '../config/localStorage';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    let score = 0;
    const showScore = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ccc' });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      arrow: this.sound.add('sndArrow'),
    };

    this.backgrounds = [];

    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerArrows = this.add.group();

    this.time.addEvent({
      delay: 1350,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new Chaser(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new Submarine(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerArrows, this.enemies, (playerArrow, enemy) => {
      if (enemy) {
        score += enemy.score;
        saveScore(score);
        showScore.setText(`Score: ${score}`);
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerArrow.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
         && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.collider(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
        && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  update() {
    this.player.update();

    if (this.keyW.isDown) {
      this.player.moveUp();
    } else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    } else if (this.keyD.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
          || enemy.x > this.game.config.width + enemy.displayWidth
          || enemy.y < -enemy.diplayHeight * 4
          || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerArrows.getChildren().length; i += 1) {
      const laser = this.playerArrows.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    /* eslint-disable-next-line for-direction */
    for (let i = 0; i > this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}