import { PortalAppearenceEnum } from '@/assets/portal/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const PortalAppearence = defineComponent({
    value: Types.ui8,
});

export function addPortalAppearence(world: IWorld, entity: number, value: PortalAppearenceEnum) {
    addComponent(world, PortalAppearence, entity);
    PortalAppearence.value[entity] = value;
}
