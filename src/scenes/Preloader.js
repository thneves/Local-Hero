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
    this.add.image(400, 150, 'logo').setScale(2);

    // display progress bar

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x22222, 0.8);
    progressBox.fillRect(240, 490, 320, 30);

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

    // load assets need in the game
    this.load.image('logo', 'assets/logo.png');
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);
  }


  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title')
    }
  }
}