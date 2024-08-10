import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Friction = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addFriction(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Friction, entity);
    Friction.x[entity] = x;
    Friction.y[entity] = y;
}
