import { DataTypeEnum } from '../enums';
import { CircleCollisionData, CreateCircleCollisionProps } from './types';

export function createCircleCollisionData({ entity, check = false } = {} as CreateCircleCollisionProps): CircleCollisionData {
    return {
        type: DataTypeEnum.CIRCLE_COLLISION,
        entity,
        check,
    };
}