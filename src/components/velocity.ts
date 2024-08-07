import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Velocity = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addVelocity(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Velocity, entity);
    Velocity.x[entity] = x;
    Velocity.y[entity] = y;
}
