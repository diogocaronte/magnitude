import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Portal = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addPortal(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Portal, entity);

    Portal.x[entity] = x;
    Portal.y[entity] = y;
}
