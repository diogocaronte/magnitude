import { DataTypeEnum } from '../types';
import { CreateCircleCollisionProps, ICircleCollisionData } from './types';

export const CircleCollisionData: ICircleCollisionData[] = [];

export function createCircleCollisionData({ entity, check = false } = {} as CreateCircleCollisionProps): ICircleCollisionData {
    return {
        type: DataTypeEnum.CIRCLE_COLLISION,
        entity,
        check,
    };
}
