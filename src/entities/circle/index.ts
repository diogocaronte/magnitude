import { CircleAppearenceEnum } from '@/assets/circle/types';
import { addCircleAppearence } from '@/components/circle/appearence';
import { addRadius } from '@/components/radius';
import { addTransform } from '@/components/transform';
import { addEntity, IWorld } from 'bitecs';
import { CircleProps } from './types';

export function createCircle(
    world: IWorld,
    { x = 0, y = 0, angle = 0, radius = 5, appearence = CircleAppearenceEnum.BLUE } = {} as CircleProps,
) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addRadius(world, entity, radius);
    addCircleAppearence(world, entity, appearence);

    return entity;
}
