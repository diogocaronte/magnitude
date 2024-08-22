import { addEntity, IWorld } from 'bitecs';
import { PlanetAppearenceEnum } from '../../assets/planet/types';
import { addPlanetAppearence } from '../../components/planet/appearence';
import { addPosition } from '../../components/position';
import { addRadius } from '../../components/radius';
import { PlanetProps } from './types';

export function createPlanet(
    world: IWorld,
    { x = 0, y = 0, radius = 88, appearence = PlanetAppearenceEnum.PINK} = {} as PlanetProps,
) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addRadius(world, entity, radius);
    addPlanetAppearence(world, entity, appearence);
    
    return entity;
}
