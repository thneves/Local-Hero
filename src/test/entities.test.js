import Entity from '../entities/Entities';
import Player from '../entities/Player';
import Chaser from '../entities/Chaser';
import GunShip from '../entities/GunShip';
import Submarine from '../entities/Submarine';

describe('Checking extended classes of Entity class', () => {
  test('Player class', () => {
    expect(Player.prototype instanceof Entity).toBe(true);
  });

  test('Chaser class', () => {
    expect(Chaser.prototype instanceof Entity).toBe(true);
  });

  test('Gunship class', () => {
    expect(GunShip.prototype instanceof Entity).toBe(true);
  });

  test('Submarine class', () => {
    expect(Submarine.prototype instanceof Entity).toBe(true);
  });
});