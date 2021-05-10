export class SimpleScene extends Phaser.Scene {

  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
  }
  create() {
    this.add.text(100, 100, 'Hello Phaser', { fill: '#0f0'});
    this.add.image(100, 200, 'cokecan');
    this.add.image(200, 300, 'cokecan');
    this.add.image(300, 400, 'cokecan');
  }
}