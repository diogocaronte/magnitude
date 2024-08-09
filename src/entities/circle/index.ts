import { addEntity, IWorld } from 'bitecs';
import { CircleAppearenceEnum } from '../../assets/circle/types';
import { addCircleAppearence } from '../../components/circle/appearence';
import { addPosition } from '../../components/position';
import { addRadius } from '../../components/radius';
import { CircleProps } from './types';

export function createCircle(
    world: IWorld,
    { x = 0, y = 0, radius = 5, appearence = CircleAppearenceEnum.BLUE }: Partial<CircleProps> = {},
) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addRadius(world, entity, radius);
    addCircleAppearence(world, entity, appearence);

    return entity;
}
