import { addEntity, IWorld } from 'bitecs';
import { AsteroidAppearenceEnum } from '../../assets/asteroid/types';
import { addAsteroid } from '../../components/asteroid';
import { addAsteroidAppearence } from '../../components/asteroid/appearence';
import { addPosition } from '../../components/position';
import { addRadius } from '../../components/radius';
import { AsteroidProps } from './types';
import { addHealth } from '../../components/health';

export function createAsteroid(
    world: IWorld,
    { x = 0, y = 0, radius = 88, appearence = AsteroidAppearenceEnum.ORANGE, value = 0, maximum = 100 }: Partial<AsteroidProps> = {},
) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addRadius(world, entity, radius);
    addAsteroidAppearence(world, entity, appearence);
    addAsteroid(world, entity, x, y);
    addHealth(world, entity, value, maximum)
    
    return entity;
}
