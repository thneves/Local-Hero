import { postScore, getScores } from '../config/scoresAPI';
import 'regenerator-runtime';

postScore.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ user: 'user', score: 10 }),
}));

getScores.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(),
}));

describe('Post new scores', () => {
  test('Post new score with its username', () => postScore('user', 10).then(response => {
    expect(response.result).toStrictEqual('Leaderboard score created correctly.');
  }));
});

describe('Get scores from API', () => {
  test('It must resturn an object', () => getScores().then(response => {
    expect(typeof response).toBe('object');
  }));
});