import 'phaser';
import config from '../config/config';
import Button from '../objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {

    this.load.image('sprBtnRestart', 'assets/ui/sprBtnRestart.png');
    this.load.image('sprBtnRestartDown', 'assets/ui/sprBtnRestartDown.png')
    this.load.image('sprBtnRestartHover', 'assets/ui/sprBtnRestartHover.png')

    this.add.image(400,300, 'bgMenu').setScale(0.4)
    // Game
    this.gameButton = new Button(
        this,
        config.width/2,
        config.height/2 - 100,
        'blueButton1',
        'blueButton2',
        'Play',
        'Game'
       );
    
    this.optionsButton = new Button(
      this,
      config.width/2,
      config.height/2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options'
    );

    this.creditsButton = new Button(
      this,
      config.width/2,
      config.height/2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits'
    );

    this.title = this.add.text(this.game.config.width * 0.1, 75, "FISHERMAN LOCAL HERO", {
      fontFamily: 'monospace',
      fontSize: 52,
      fontStyle: 'bold',
      color: '#3c096c',
      // align: 'center'
    })

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      // this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}