import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const CircleCollision = defineComponent({
    index: Types.ui32,
});

export function addCircleCollision(world: IWorld, entity: number) {
    addComponent(world, CircleCollision, entity);
    CircleCollision.index[entity] = 0;
}
