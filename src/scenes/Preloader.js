import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.cameras.main.fadeIn(800, 0, 0, 0);
    this.add.image(400, 150, 'logo');

    // display progress bar

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x22222, 0.8);
    progressBox.fillRect(240, 490, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'waiting swell...',
      style: {
        font: '20px monospace',
        fill: '#fff'
      }
    });

    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#fff'
      }
    });

    percentText.setOrigin(0.5, 0.5)

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fff'
      }
    });

    assetText.setOrigin(0.7, 0.7)

    // update progress bar

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xfffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading deep ocean animals..' + file.key);
    });

    // remove progress bar when complete

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      assetText.destroy();
      percentText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.read, [], this);

    // PRELOAD ASSETS

    this.load.image('logo', 'assets/logo.png');
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('bgMenu', 'assets/bgMenu.png')
    this.load.audio('bgMusic', 'assets/bgMusicBeach.mp3');

    // GAME ASSETS

    this.load.image("sprBg0", 'assets/bgs/sprBg0.png');
    this.load.image("sprBg1", 'assets/bgs/sprBg1.png');
    
    this.load.spritesheet("sprExplosion", 'assets/chars/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("sprEnemy0", 'assets/chars/sprEnemy0.png', {
      frameWidth: 20,
      frameHeight: 100
    });

    this.load.image("sprEnemy1", 'assets/chars/sprEnemy1.png');

    this.load.spritesheet("sprEnemy2", 'assets/chars/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.image("sprEnemyLaser", 'assets/chars/sprEnemyLaser.png');
    this.load.image("sprPlayerArrow", 'assets/chars/sprPlayerArrow.png');
    this.load.spritesheet("sprPlayer", 'assets/chars/sprPlayer.png', {
      frameWidth: 64,
      frameHeight: 64
    });

    // SOUNDS

    this.load.audio("sndExplode0", 'assets/audio/sndExplode0.wav');
    this.load.audio("sndExplode1", 'assets/audio/sndExplode1.wav');
    this.load.audio("sndArrow", 'assets/audio/sndArrow.wav');
  }


  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title')
    }
  }
}