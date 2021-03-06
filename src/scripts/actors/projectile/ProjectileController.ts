import { NoGravityBullet } from './NoGravityBullet';
import { Projectile } from './Projectile';
import { ProjectileBuilder } from './ProjectileBuilder';
import { ThrowBackEffect } from './effects/ThrowBackEffect';
import { GlobalConfig, TextureKey } from '../../Globals';
import { GameScene } from '../../scenes/GameScene';
import { Actor } from '../Actor';

/**
 * Manages everything that generally flys around in the world and has some effect on actors.
 */
export class ProjectileController {
  scene: GameScene;
  group: Phaser.Physics.Arcade.Group;
  builder = new ProjectileBuilder(this);

  constructor(scene: GameScene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      // allowGravity: false,
    });
  }

  addProjectile(projectile: Projectile) {
    this.group.add(projectile);
    projectile.setupPhysicalAttributes();
  }

  fireBullet(x: number, y: number, velocity: Phaser.Math.Vector2, texture: TextureKey, owner: Actor) {
    this.builder
      .reset()
      .effect(new ThrowBackEffect())
      .texture(texture)
      .owner(owner)
      .type(new NoGravityBullet(velocity))
      .spawn(x, y);
  }

  newBuilder() {
    return new ProjectileBuilder(this);
  }
}
