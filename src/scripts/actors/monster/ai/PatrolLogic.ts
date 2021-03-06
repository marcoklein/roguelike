import { MonsterLogic } from './MonsterLogic';
import { Monster } from '../../Monster';
import { GlobalConfig } from '../../../Globals';
import { Platform } from '../../../level/platforms/Platform';
import { ObjectCache } from '../../../ObjectCache';

/**
 * Patrols between two points.
 * Trys to always go into that area.
 */
export class PatrolLogic extends MonsterLogic {
  /** If blocked change direction */
  lastX: number;

  platform: Platform | undefined;
  minX: number;
  maxX: number;

  /**
   * May be -1 or 1.
   */
  direction = 1;

  constructor() {
    super();
  }

  onAttach(monster: Monster) {
    this.lastX = monster.x;
  }

  onDetach(monster: Monster) {}

  update(monster: Monster, time: number, delta: number) {
    if (!this.platform) {
      monster.getBottomCenter(ObjectCache.vectorA);
      this.platform = monster.level.platforms.findPlatformUnderneath(ObjectCache.vectorA.x, ObjectCache.vectorA.y);
      if (!this.platform) {
        console.warn('no platform under monster found');
        return;
      }
      this.minX = this.platform.getTopLeft().x;
      this.maxX = this.platform.getTopRight().x;
    }
    if (monster.x < this.minX) {
      // go right
      this.direction = 1;
    } else if (monster.x > this.maxX) {
      // go left
      this.direction = -1;
    }
    if (Math.abs(this.lastX - monster.x) === 0) {
      this.direction = -this.direction;
    }
    this.lastX = monster.x;
    monster.move(GlobalConfig.monsters.speed, this.direction < 0);
  }
}
