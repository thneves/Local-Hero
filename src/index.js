import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const config = {
  width: 680,
  height: 400,
  scene: SimpleScene
};

new Phaser.Game(config);

