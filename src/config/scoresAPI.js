import "regenerator-runtime/runtime.js";

const fetch = require('node-fetch');

const postScore = async (player, score) => {
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jD9rgfz1qMpd37Se0rcs/scores',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: player, score: score})
    });
    const response = await request.json();
    return response;
  } catch(err) {
    throw new Error('Unable to post Scores!');
  }
};

const getScores = async () => {
  const scoreboard = [];
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jD9rgfz1qMpd37Se0rcs/scores', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    const data = response.result;
    data.forEach(entry => {
      scoreboard.push([entry.user, entry.score]) 
    });
    return scoreboard;
  } catch (error) {
    throw new Error("Can't find scoreboard!");
  }
}

export { postScore, getScores };