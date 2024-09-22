import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Transform = defineComponent({
    x: Types.f32,
    y: Types.f32,
    angle: Types.f32,
});

export function addTransform(world: IWorld, entity: number, x: number, y: number, angle = 0) {
    addComponent(world, Transform, entity);
    Transform.x[entity] = x;
    Transform.y[entity] = y;
    Transform.angle[entity] = angle;
}
