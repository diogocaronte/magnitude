import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const RectangleCollision = defineComponent({
    index: Types.ui32,
});

export function addRectangleCollision(world: IWorld, entity: number) {
    addComponent(world, RectangleCollision, entity);
    RectangleCollision.index[entity] = 0;
}
