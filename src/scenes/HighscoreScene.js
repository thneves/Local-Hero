import Phaser from 'phaser';
import { getScores } from '../config/scoresAPI';
import config from '../config/config';
import Button from '../objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor(){
    super('Highscore');
  }

  create() {
    this.title = this.add.text(config.width * 1.5, 128, 'HIGHSCORES', {
      fontFamily: 'monosapce',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    getScores().then(response => {
      response.sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((game, i) => {
        const text = `${i + 1}: ${game[0]} -----> ${game[1]}`;
        this.add.text(config.width / 2, 200 + i * 30, text, {
          fontFamily: 'monospace',
          fontSize: '20px',
          color: '#31a2F2',
          align: 'center',
          lineHeight: '1.5',
        }).setOrigin(0.5, 0.5);
        return text;
      });
    });

    this.menuButton = new Button(
      this,
      config.width/2,
      config.height/2,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title'
    );
  }
}