import { Projectile } from './Projectile';
import { ProjectileType } from './ProjectileType';

/**
 * Something that flys and has an effect on collision.
 */
export class NoGravityBullet extends ProjectileType {
  private velocity: Phaser.Math.Vector2;

  constructor(velocity: Phaser.Math.Vector2) {
    super();
    this.velocity = velocity;
  }

  setupPhysicalAttributes(projectile: Projectile): void {
    projectile.flipX = this.velocity.x < 0;
    projectile.depth = -1;
    projectile.setVelocity(this.velocity.x, this.velocity.y);
    projectile.setGravityY(-projectile.scene.physics.world.gravity.y); // shoot straight
  }

  onDestroy(projectile: Projectile): void {}

  onUpdate(time: number, delta: number, projectile: Projectile) {}
}
