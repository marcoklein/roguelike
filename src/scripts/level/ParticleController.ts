import { LevelController } from './LevelController';
import { Actor } from '../actors/Actor';
import { GlobalConfig } from '../Globals';

/**
 * Manages and creates particles for cool effects.
 */
export class ParticleController {
  readonly level: LevelController;

  private emitterCache: { [key: string]: Phaser.GameObjects.Particles.ParticleEmitterManager } = {};
  private emitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

  constructor(level: LevelController) {
    this.level = level;
    this.init();
  }

  private init() {}

  emitDeathExplosion(actor: Actor) {
    this.emitParticles(actor.x, actor.y - actor.displayHeight / 2, actor.texture.key, actor.frame.name);
    this.level.sounds.playSound('explosion');
  }

  emitParticles(x: number, y: number, texture: string, frame?: string) {
    const particles =
      this.emitterCache[texture] ||
      this.level.scene.add.particles(texture, undefined, {
        active: false,
      });
    const emitter = particles.createEmitter({
      x,
      y,
      scale: { start: 0.7, end: 0 },
      rotate: { start: 0, end: 360 },
      lifespan: [1000, 2000],
      gravityY: 100,
      maxParticles: 10,
      frequency: 5,
      speed: 50,
    });
    this.level.scene.time.delayedCall(2000, () => {
      const index = this.emitters.indexOf(emitter);
      if (index !== -1) {
        this.emitters.splice(index, 1);
      }
    });
    this.emitters.push(emitter);
  }

  destroyParticles() {
    this.emitters.forEach((e) => e.remove());
    Object.values(this.emitterCache).forEach((e) => e.destroy());
    this.emitterCache = {};
  }
}
