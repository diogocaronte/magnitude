import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const BulletCollision = defineComponent({
    index: Types.ui32,
});

export function addBulletCollision(world: IWorld, entity: number) {
    addComponent(world, BulletCollision, entity);
    BulletCollision.index[entity] = 0;
}
