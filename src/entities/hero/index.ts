import { HeroAppearenceEnum } from '@/assets/hero/types';
import { addHeroAppearence } from '@/components/hero/appearence';
import { addRadius } from '@/components/radius';
import { addTransform } from '@/components/transform';
import { addEntity, IWorld } from 'bitecs';
import { HeroProps } from './types';

export function createHero(
    world: IWorld,
    { x = 0, y = 0, angle = 0, radius = 5, appearence = HeroAppearenceEnum.BASIC } = {} as HeroProps,
) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addRadius(world, entity, radius);
    addHeroAppearence(world, entity, appearence);

    return entity;
}
