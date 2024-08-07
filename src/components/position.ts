import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Position = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addPosition(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Position, entity);
    Position.x[entity] = x;
    Position.y[entity] = y;
}
