import { GlobalConfig, TextureKey } from '../../Globals';
import { Projectile } from './Projectile';
import { ProjectileController } from './ProjectileController';
import { ProjectileEffect } from './effects/ProjectileEffect';
import { ProjectileType } from './ProjectileType';

export class ProjectileBuilder {
  readonly controller: ProjectileController;
  private _type: ProjectileType | undefined;
  private _texture: TextureKey | undefined;
  private _lifetime: number;
  private effects: ProjectileEffect[] = [];

  constructor(projectileController: ProjectileController) {
    this.controller = projectileController;
  }

  reset() {
    this.effects = [];
    this._texture = undefined;
    this._type = undefined;
    this._lifetime = GlobalConfig.bullets.lifetime;
    return this;
  }

  type(type: ProjectileType) {
    this._type = type;
    return this;
  }

  texture(texture: TextureKey) {
    this._texture = texture;
    return this;
  }

  effect(effect: ProjectileEffect) {
    this.effects.push(effect);
    return this;
  }

  lifetime(time: number) {
    this._lifetime = time;
    return this;
  }

  spawn(x: number, y: number) {
    if (!this._texture) throw new Error('Texture needed');
    if (!this._type) throw new Error('Type needed');
    const projectile = new Projectile(this.controller.scene, x, y, this._texture, Object.create(this._type));
    projectile.lifetime = this._lifetime;
    this.effects.forEach((effect) => projectile.addEffect(Object.create(effect)));
    this.controller.addProjectile(projectile);
    return projectile;
  }
}
