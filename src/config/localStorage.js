const saveScore = (score) => {
  localStorage.setItem('score', JSON.stringify(score));
};

const getLocalScore = () => {
  const score = JSON.parse(localStorage.getItem('score'));
  return score;
};

const resetScores = () => {
  saveScore(0);
};

export { saveScore, getLocalScore, resetScores };
