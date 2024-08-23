import { RectangleAppearenceEnum } from '@/assets/rectangle/types';
import { addRectangleAppearence } from '@/components/rectangle/appearence';
import { addPosition } from '@/components/position';
import { addEntity, IWorld } from 'bitecs';
import { RectangleProps } from './types';
import { addRectangle } from '@/components/rectangle';

export function createRectangle(world: IWorld, { x = 0, y = 0, width = 50, height = 30, appearence = RectangleAppearenceEnum.PURPLE } = {} as RectangleProps) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addRectangle(world, entity, x, y, width, height)
    addRectangleAppearence(world, entity, appearence);

    return entity;
}
