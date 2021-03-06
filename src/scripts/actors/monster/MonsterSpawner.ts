import { MonsterController } from './MonsterController';
import { TextureKey } from '../../Globals';
import { MonsterLogic } from './ai/MonsterLogic';
import { Wearable } from '../wearables/Wearable';
import { Monster } from '../Monster';
import { Platform } from '../../level/platforms/Platform';
import { Random } from '../../level/Random';

export class MonsterSpawner {
  spawner: MonsterController;
  _texture: TextureKey | undefined;
  _logics: MonsterLogic[];
  wearable: Wearable | undefined;
  _givesScore: number = 1;

  constructor(spawner: MonsterController) {
    this.spawner = spawner;
    this.reset();
  }

  static create(controller: MonsterController) {
    return new MonsterSpawner(controller);
  }

  reset() {
    this._texture = undefined;
    this.wearable = undefined;
    this._logics = [];
    return this;
  }

  equip(wearable: Wearable) {
    this.wearable = wearable;
    return this;
  }

  texture(texture: TextureKey) {
    this._texture = texture;
    return this;
  }

  logic(logic: MonsterLogic) {
    this._logics.push(logic);
    return this;
  }

  logics(logics: MonsterLogic[]) {
    logics.forEach((l) => this.logic(l));
    return this;
  }

  givesScore(score: number) {
    this._givesScore = score;
    return this;
  }

  /**
   * Spawns monster on random position on given platform.
   * @param platform
   * @param x Optional x-coordinate to spawn monster relative to platform.
   */
  spawn(platform: Platform, x: number = Random.between(0, platform.displayWidth)) {
    if (!this._texture) throw new Error('Texture needed');
    const monster = new Monster(this.spawner.level, platform.x + x, platform.y, this._texture, this._givesScore);
    if (this.wearable) monster.hands.equip(Object.create(this.wearable));
    this._logics.forEach((logic) => monster.addLogic(Object.create(logic)));
    this.spawner.spawnMonster(monster);
    return monster;
  }
}
