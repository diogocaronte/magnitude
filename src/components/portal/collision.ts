import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const PortalCollision = defineComponent({
    index: Types.ui32,
});

export function addPortalCollision(world: IWorld, entity: number) {
    addComponent(world, PortalCollision, entity);
    PortalCollision.index[entity] = 0;
}
