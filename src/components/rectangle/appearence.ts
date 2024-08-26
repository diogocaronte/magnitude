import { RectangleAppearenceEnum } from '@/assets/rectangle/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const RectangleAppearence = defineComponent({
    value: Types.ui8,
});

export function addRectangleAppearence(world: IWorld, entity: number, value: RectangleAppearenceEnum) {
    addComponent(world, RectangleAppearence, entity);
    RectangleAppearence.value[entity] = value;
}
