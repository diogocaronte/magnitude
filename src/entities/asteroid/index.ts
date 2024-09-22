import { AsteroidAppearenceEnum } from '@/assets/asteroid/types';
import { addAsteroidAppearence } from '@/components/asteroid/appearence';
import { addHealth } from '@/components/health';
import { addRadius } from '@/components/radius';
import { addTransform } from '@/components/transform';
import { addEntity, IWorld } from 'bitecs';
import { AsteroidProps } from './types';

export function createAsteroid(
    world: IWorld,
    {
        x = 0,
        y = 0,
        angle = 0,
        radius = 88,
        appearence = AsteroidAppearenceEnum.ORANGE,
        value = 0,
        maximum = 100,
    }: Partial<AsteroidProps> = {},
) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addRadius(world, entity, radius);
    addAsteroidAppearence(world, entity, appearence);
    addHealth(world, entity, value, maximum);

    return entity;
}
