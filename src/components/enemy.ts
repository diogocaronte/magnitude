import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Enemy = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addEnemy(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Enemy, entity);

    Enemy.x[entity] = x;
    Enemy.y[entity] = y;
}
