import Model from '../Model';

jest.mock('../Model');

beforeEach(() => {
  Model.mockClear();
});

describe('Defines global settings of sounds', () => {
  it('Can define if the sound for the game is turned on', () => {
    const model = new Model();
    model.soundOn = true;
    expect(model.soundOn).toBe(true);
  });

  it('Turn off the game sound', () => {
    const model = new Model();
    model.soundOn = true;
    expect(model.soundOn).toBe(true);
    model.soundOn = false;
    expect(model.soundOn).toBe(false);
  });

  it('Turn on game sound', () => {
    const model = new Model();
    model.musicOn = true;
    expect(model.musicOn).toBe(true);
  });

  it('Turn off global music and sounds', () => {
    const model = new Model();
    model.musicOn = true;
    expect(model.musicOn).toBe(true);
    model.musicOn = false;
    expect(model.musicOn).toBe(false);
  })
})
