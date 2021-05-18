import 'phaser';


export default {
  type: Phaser.AUTO,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 800,
  height: 600,
  backgroundColor: 'white',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
}