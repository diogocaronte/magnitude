import { DataTypeEnum } from '../types';
import { CreateHeroCollisionProps, IHeroCollisionData } from './types';

export const HeroCollisionData: IHeroCollisionData[] = [];

export function createHeroCollisionData({ entity } = {} as CreateHeroCollisionProps): IHeroCollisionData {
    return {
        type: DataTypeEnum.HERO_COLLISION,
        entity,
    };
}
