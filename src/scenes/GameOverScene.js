import Phaser from 'phaser';
import { getLocalScore, resetScores } from '../config/localStorage';
import config from '../config/config';
import { postScore } from '../config/scoresAPI';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  scoreForm(score) {
    const form = document.createElement('form');
    const textInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const bodyTag = document.getElementsByTagName('body')[0];
    submitBtn.type = 'submit';
    submitBtn.id = 'submit-button';
    submitBtn.innerHTML = 'Submit';
    submitBtn.classList.add('submit-button');
    textInput.type = 'text';
    textInput.name = 'name';
    textInput.placeholder = 'Your fisherman name here';
    textInput.classList.add('text-input');
    form.id = 'user-form';
    form.append(textInput);
    form.append(submitBtn);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.player = textInput.value;

      if (this.player) {
        postScore(this.player, score).then(setTimeout(() => {
          console.log('posting score');
        }, 3000));
        this.scene.start('Title');
      }
    });
    bodyTag.append(form);
    return form;
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#3c096c',
      align: 'center'
    });

    this.title.setOrigin(0.5);

    let playerScore = getLocalScore();
    resetScores();

    this.message = this.add.text(config.width*0.375, 200, `SCORE: ${playerScore}`);

    const form = this.scoreForm(playerScore);
    const element = this.add.dom(this.game.config.width * 0.5, -300, form);
    element.setDepth(3);

  //   this.btnRestart = this.add.sprite(
  //     this.game.config.width * 0.5,
  //     this.game.config.height * 0.5,
  //     "sprBtnRestart"
  //   );

  //   this.btnRestart.setInteractive();

  //   this.btnRestart.on("pointerover", function() {
  //     this.btnRestart.setTexture("sprBtnRestartHover");
  //   }, this);

  //   this.btnRestart.on("pointerout", function() {
  //     this.setTexture("sprBtnRestart");
  //   });

  //   this.btnRestart.on("pointerdown", function() {
  //     this.btnRestart.setTexture("sprBtnRestartDown");
  //   }, this);

  //   this.btnRestart.on("pointerup", function() {
  //     // this.btnRestart.setTexture("sprBtnRestart");
  //     this.scene.start("Title")
  //   }, this)
  }
}