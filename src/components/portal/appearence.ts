import { addComponent, defineComponent, IWorld, Types } from 'bitecs';
import { PortalAppearenceEnum } from '../../assets/portal/types';

export const PortalAppearence = defineComponent({
    value: Types.ui8,
});

export function addPortalAppearence(world: IWorld, entity: number, value: PortalAppearenceEnum) {
    addComponent(world, PortalAppearence, entity);
    PortalAppearence.value[entity] = value;
}
