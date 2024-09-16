import { DataTypeEnum } from '../types';
import { CreateEnemyCollisionProps, IEnemyCollisionData } from './types';

export const EnemyCollisionData: IEnemyCollisionData[] = [];

export function createEnemyCollisionData({ entity, hit = false } = {} as CreateEnemyCollisionProps): IEnemyCollisionData {
    return {
        type: DataTypeEnum.ENEMY_COLLISION,
        entity,
        hit,
    };
}
