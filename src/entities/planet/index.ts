import { PlanetAppearenceEnum } from '@/assets/planet/types';
import { addPlanetAppearence } from '@/components/planet/appearence';
import { addRadius } from '@/components/radius';
import { addTransform } from '@/components/transform';
import { addEntity, IWorld } from 'bitecs';
import { PlanetProps } from './types';

export function createPlanet(
    world: IWorld,
    { x = 0, y = 0, angle = 0, radius = 88, appearence = PlanetAppearenceEnum.PINK } = {} as PlanetProps,
) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addRadius(world, entity, radius);
    addPlanetAppearence(world, entity, appearence);

    return entity;
}
