import Phaser from 'phaser';
import Entity from '../entities/Entities';

test('Entity is subclass of Phaser Sprite', () => {
  expect(Entity.prototype instanceof Phaser.GameObjects.Sprite).toBe(true);
})