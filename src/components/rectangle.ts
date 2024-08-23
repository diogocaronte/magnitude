import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Rectangle = defineComponent({
    x: Types.f32,
    y: Types.f32,
    width: Types.f32,
    height: Types.f32,
});

export function addRectangle(world: IWorld, entity: number, x: number, y: number, width: number, height: number) {
    addComponent(world, Rectangle, entity);
    Rectangle.x[entity] = x;
    Rectangle.y[entity] = y;
    Rectangle.width[entity] = width;
    Rectangle.height[entity] = height;
}
