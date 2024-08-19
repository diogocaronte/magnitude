import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const AsteroidCollision = defineComponent({
    index: Types.ui32,
});

export function addAsteroidCollision(world: IWorld, entity: number) {
    addComponent(world, AsteroidCollision, entity);
    AsteroidCollision.index[entity] = 0;
}
