import { addComponent, defineComponent, IWorld, Types } from 'bitecs';
import { CircleAppearenceEnum } from '../../assets/circle/types';

export const CircleAppearence = defineComponent({
    value: Types.ui8,
});

export function addCircleAppearence(world: IWorld, entity: number, value: CircleAppearenceEnum) {
    addComponent(world, CircleAppearence, entity);
    CircleAppearence.value[entity] = value;
}
