import { DataTypeEnum } from '../types';
import { CreateBulletCollisionProps, IBulletCollisionData } from './types';

export const BulletCollisionData: IBulletCollisionData[] = [];

export function createBulletCollisionData({ entity } = {} as CreateBulletCollisionProps): IBulletCollisionData {
    return {
        type: DataTypeEnum.BULLET_COLLISION,
        entity,
    };
}
