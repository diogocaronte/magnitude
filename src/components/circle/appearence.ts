import { CircleAppearenceEnum } from '@/assets/circle/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const CircleAppearence = defineComponent({
    value: Types.ui8,
});

export function addCircleAppearence(world: IWorld, entity: number, value: CircleAppearenceEnum) {
    addComponent(world, CircleAppearence, entity);
    CircleAppearence.value[entity] = value;
}
